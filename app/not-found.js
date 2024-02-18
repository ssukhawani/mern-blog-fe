"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { routeEndpoints } from "./constants/routeEndpoints";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="h-[500px] w-full flex items-center gap-3 flex-col justify-center">
      <h2 className="text-[30px] font-bold font-Stapel">Page Not Found</h2>
      <button
        className="transition duration-150 ease-in-out hover:border-black hover:text-black rounded border border-color-blue w-[140px] h-[46px] text-base"
        onClick={() => router.push(routeEndpoints.HOME)}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
