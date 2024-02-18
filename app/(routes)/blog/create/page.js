"use client";
import React, { useState } from "react";
import blogService from "@/app/services/blogService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toastMessage } from "@/app/constants/toastMessage";
import { toast } from "react-toastify";

// CreateBlog component
const CreateBlog = () => {
  const router = useRouter();

  const [newBlog, setNewBlog] = useState({
    heading: "",
    slug: "",
    body: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    });
  };

  const handleError = (error) => {
    if ("errors" in error.response) {
      error.response.errors.forEach((err) => {
        toast.error(err.msg);
      });
    } else if (
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      toast.error(error.response.data.message);
    }
  };

  // Handle the submit of the form
  const handleCreate = async () => {
    try {
      // Call the create blog API
      const createdBlog = await blogService.post(newBlog);
      toast.success(toastMessage.NEW_BLOG_CREATED);
      // Redirect to homepage
      router.push(`/`);
    } catch (error) {
      handleError(error);
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-end mt-4 w-[90%] lg:w-[70vw] ">
        <Link
          className="flex justify-center md:w-[200px] bg-black p-3 rounded-lg mt-4 text-white md:text-lg outline-none border-none hover:text-white hover:opacity-70"
          href="/"
        >
          Back to Home
        </Link>
      </div>
      <div className="bg-white shadow-lg md:w-[70vw] h-full rounded-lg flex-shrink-0 flex flex-col justify-center items-start p-8">
        {/* Create mode */}
        <label htmlFor="heading" className="text-lg font-bold mb-2">
          Heading:
        </label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={newBlog.heading}
          onChange={handleInputChange}
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
          value={newBlog.slug}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter Slug"
        />

        <label htmlFor="body" className="text-lg  font-bold mb-2">
          Body:
        </label>
        <textarea
          id="body"
          name="body"
          value={newBlog.body}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          placeholder="Enter Body"
        />

        <div className="flex gap-4">
          <button
            className="w-[200px] bg-green-500 p-3 rounded-lg mt-4 text-white text-lg outline-none border-none hover:text-white hover:opacity-70"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
