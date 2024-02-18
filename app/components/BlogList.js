"use client";
import React, { useEffect, useState } from "react";
import blogService from "../services/blogService";
import { apiEndpoints } from "../constants/apiEndpoints";
import Link from "next/link";
import Image from "next/image";
import Loader from "../loading";
import LocalStorageRepository from "../utils/storage";

export async function BlogList() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = LocalStorageRepository.get("blog-user");

  useEffect(() => {
    const fetchBlogList = async () => {
      try {
        setLoading(true);
        const response = await blogService.get(apiEndpoints.ALL_BLOGS);
        setAllBlogs(response);
      } catch (error) {
        handleErrorToast(error);
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogList();
  }, []);

  return (
    <div className="flex flex-col ">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="text-end mt-4">
            {user && user.token && (
              <Link
                className=" w-[200px] bg-black p-3 px-8 rounded-lg mt-4 text-white text-lg outline-none border-none hover:text-white hover:opacity-70"
                href={"/blog/create"}
              >
                Create Blog
              </Link>
            )}
          </div>
          <div className="mt-10 mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allBlogs.map((blog, index) => (
              <Link
                key={index}
                href={`/blogs/${blog.slug}`}
                className="flex-shrink-0 group rounded-lg my-2 overflow-hidden border border-gray-300 hover:shadow-lg transition-transform transform hover:scale-105"
              >
                <div className="h-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                  <div className="p-5 h-74">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden overflow-ellipsis">
                      {blog.heading}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden overflow-ellipsis">
                      {blog.body}
                    </p>
                    <div className="flex gap-3 items-center justify-start mb-3">
                      {blog.author.profilePicture && (
                        <Image
                          src={blog.author.profilePicture}
                          alt={`${blog.author.username}'s profile`}
                          className="w-6 h-6 rounded-full"
                          width={26}
                          height={26}
                        />
                      )}
                      <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
                        Author - {blog.author.username}
                      </p>
                    </div>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-2">
                      Posted on:{" "}
                      {new Date(blog.posted_date).toLocaleDateString()}
                    </p>
                    <div className="h-inherit flex">
                      <p className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg
                          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                          />
                        </svg>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BlogList;
