"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserAuth from "./Auth";
import LocalStorageRepository from "../utils/storage";
import { usePathname, useRouter } from "next/navigation";
import ProfileIcon from "./ProfileIcon";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [route, setRoute] = useState(null);
  const popup = LocalStorageRepository.get("login-popup");
  const user = LocalStorageRepository.get("blog-user");
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative text-base md:text-lg p-2 md:p-4 bg-black text-white shadow-md px-6 flex items-center justify-between z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link className="text-base md:text-2xl font-bold" href="/">
          Blog Genie
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex space-x-8">
          {user && user.token ? (
            <ProfileIcon />
          ) : (
            <>
              <button onClick={() => setRoute("login")}>Login</button>
              <button onClick={() => setRoute("signup")}>Signup</button>
            </>
          )}
        </nav>

        {/* Hamburger Menu - Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Responsive Menu - Mobile */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black text-white p-4">
            <div className="flex flex-col space-y-4 px-2">
              <nav className="lg:hidden md:flex space-x-8">
                {user && user.token ? (
                  <ProfileIcon />
                ) : (
                  <>
                    <button
                      className="inline-block text-left"
                      onClick={() => setRoute("login")}
                    >
                      Login
                    </button>
                    <button
                      className="inline-block text-left"
                      onClick={() => setRoute("signup")}
                    >
                      Signup
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
      <>
        {Boolean(route) ? (
          <div className="">
            {route === "login" ? (
              <UserAuth type={"login"} setRoute={setRoute} route={route} />
            ) : (
              <UserAuth type={"signup"} setRoute={setRoute} route={route} />
            )}
          </div>
        ) : (
          popup &&
          popup.isOpen && (
            <div className="">
              {popup.route === "login" ? (
                <UserAuth
                  type={"login"}
                  setRoute={setRoute}
                  route={popup.route}
                />
              ) : (
                <UserAuth
                  type={"signup"}
                  setRoute={setRoute}
                  route={popup.route}
                />
              )}
            </div>
          )
        )}
      </>
    </header>
  );
};

export default Navbar;
