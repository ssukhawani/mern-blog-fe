"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Error({ error, reset }) {
  return (
    <div className="h-[500px] w-full flex items-center gap-3 flex-col justify-center">
      <h2 className="text-[30px] font-bold font-Stapel">
        Something went wrong!
      </h2>
      <button
        className="transition duration-150 ease-in-out hover:border-black hover:text-black rounded border border-color-blue w-[140px] h-[46px] text-base"
        onClick={() => reset()}
      >
        Go Home
      </button>
    </div>
  );
}
