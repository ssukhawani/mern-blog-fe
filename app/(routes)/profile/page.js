"use client";
import { apiEndpoints } from "@/app/constants/apiEndpoints";
import { toastMessage } from "@/app/constants/toastMessage";
import Loader from "@/app/loading";
import authService from "@/app/services/authService";
import { handleErrorToast } from "@/app/utils/helperFunc";
import LocalStorageRepository from "@/app/utils/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await authService.get(apiEndpoints.USER_PROFILE);
        setProfileData(response);
      } catch (error) {
        setProfileData({});
        handleErrorToast(error);
        handleLogout();
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    toast.success(toastMessage.LOGGED_OUT);
    LocalStorageRepository.delete("blog-user");
    LocalStorageRepository.delete("login-popup");
    setTimeout(() => {
      router.push("/");
    }, 300);
  };

  return (
    <div className="mt-8 flex justify-center items-center w-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-lg w-full lg:w-[500px] h-[500px] rounded-lg flex-shrink-0 flex flex-col justify-center items-center">
          <Image
            src={profileData.profilePicture}
            alt={`${profileData.username}'s profile`}
            className="rounded-full w-20 h-20 mb-4"
            width={80}
            height={80}
          />
          <h1 className="text-2xl font-bold mb-2">{profileData.username}</h1>
          <p className="text-gray-600">{profileData.email}</p>
          <button
            className="w-[200px] bg-black p-3 rounded-lg mt-8 text-white text-lg outline-none border-none hover:text-white hover:opacity-70"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
