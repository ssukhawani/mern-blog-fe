import React from "react";
import blogService from "../services/blogService";
import { apiEndpoints } from "../constants/apiEndpoints";
import Link from "next/link";

export async function BlogList() {
  const allBlogs = await blogService.get(apiEndpoints.ALL_BLOGS);

  return (
    <>
      {allBlogs.map((blog, index) => (
        <Link
          key={"index"}
          href={blog.slug}
          className="group rounded-lg border border-transparent m-4 px-5 py-4 transition-colors border-gray-300 hover:bg-gray-100 "
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            {blog.heading}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{blog.body}</p>
        </Link>
      ))}
    </>
  );
}

export default BlogList;
