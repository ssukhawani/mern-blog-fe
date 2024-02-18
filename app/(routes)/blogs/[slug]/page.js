"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";
import blogService from "@/app/services/blogService";
import LocalStorageRepository from "@/app/utils/storage";
import { handleErrorToast } from "@/app/utils/helperFunc";
import Image from "next/image";

const Blogs = ({ params: { slug } }) => {
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({
    heading: "",
    slug: "",
    body: "",
  });

  const user = LocalStorageRepository.get("blog-user");
  const router = useRouter();

  const isAuthor = user && user._id === blogData?.author?._id;

  useEffect(() => {
    const fetchBlogBySlug = async (slug) => {
      try {
        const response = await blogService.get(slug);
        setBlogData(response);
        setEditedBlog({
          heading: response.heading,
          slug: response.slug,
          body: response.body,
        });
        setLoading(false);
      } catch (error) {
        handleErrorToast(error);
        console.error("Error fetching blog data:", error);
        setLoading(false);
      }
    };

    fetchBlogBySlug(slug);
  }, [slug]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      // Call the update blog API
      const updatedBlog = await blogService.put(blogData.slug, editedBlog);
      // Redirect to the new slug
      router.push(`/`);
    } catch (error) {
      handleErrorToast(error);
      console.error("Error updating blog:", error);
    }
  };

  // Handle input changes while editing
  const handleInputChange = (e) => {
    setEditedBlog({
      ...editedBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    // Placeholder for delete functionality
    console.log("Delete Blog clicked");
    try {
      // You can implement the delete functionality here using the blogService
      await blogService.delete(blogData.slug);
      // Redirect to a different page after successful deletion
      router.push("/");
    } catch (error) {
      handleErrorToast(error);
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-end mt-4 w-[90%] lg:w-[70vw] ">
              <Link
                className="flex justify-center md:w-[200px] bg-black p-3 rounded-lg mt-4 text-white md:text-lg outline-none border-none hover:text-white hover:opacity-70"
                href="/"
              >
                Back to Home
              </Link>
            </div>
            <div className="bg-white shadow-lg w-[90%] lg:w-[70vw] h-full rounded-lg flex-shrink-0 flex flex-col justify-center items-start p-8 overflow-hidden ">
              {isEditing ? (
                <>
                  {/* Edit mode */}
                  <label htmlFor="heading" className="text-lg font-bold mb-2">
                    Heading:
                  </label>
                  <input
                    type="text"
                    id="heading"
                    name="heading"
                    value={editedBlog.heading}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    placeholder="Enter Heading"
                  />

                  <label htmlFor="slug" className="text-lg font-bold mb-2">
                    Slug:
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={editedBlog.slug}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === "Enter" && handleSave()}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    placeholder="Enter Slug"
                  />

                  <label htmlFor="body" className="text-lg  font-bold mb-2">
                    Body:
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    value={editedBlog.body}
                    onChange={handleInputChange}
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    placeholder="Enter Body"
                  />

                  <div className="flex gap-4">
                    <button
                      className="w-[200px] bg-green-500 p-3 rounded-lg mt-4 text-white text-lg outline-none border-none hover:text-white hover:opacity-70"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="w-[200px] bg-red-500 p-3 rounded-lg mt-4 text-white text-lg outline-none border-none hover:text-white hover:opacity-70"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* View mode */}
                  <div className="">
                    <h1 className="text-3xl font-bold mb-4  overflow-hidden overflow-ellipsis">
                      {blogData.heading}
                    </h1>
                    <p className="text-lg mb-6">{blogData.body}</p>
                    <div className="flex gap-3 items-center justify-start mb-3">
                      {blogData.author.profilePicture && (
                        <Image
                          src={blogData.author.profilePicture}
                          alt={`${blogData.author.username}'s profile`}
                          className="w-6 h-6 rounded-full"
                          width={26}
                          height={26}
                        />
                      )}
                      <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
                        Author - {blogData.author.username}
                      </p>
                    </div>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-2">
                      Posted on:{" "}
                      {new Date(blogData.posted_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-4 flex-col md:flex">
                    {isAuthor && (
                      <div className="flex flex-row gap-4 ">
                        <button
                          className="md:w-[200px] bg-black p-3 rounded-lg mt-4 text-white md:text-lg outline-none border-none hover:text-white hover:opacity-70"
                          onClick={handleEdit}
                        >
                          Edit Blog
                        </button>
                        <button
                          className="md:w-[200px] bg-red-500 p-3 rounded-lg mt-4 text-white md:text-lg outline-none border-none hover:text-white hover:opacity-70"
                          onClick={handleDelete}
                        >
                          Delete Blog
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
