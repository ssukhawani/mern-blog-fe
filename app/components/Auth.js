// import CloseIcon from "remixicon-react/CloseLineIcon";
"use client";
import { toastMessage } from "@/app/constants/toastMessage";
import InputWithError from "@/app/shared/InputWithError";
import LocalStorageRepository from "@/app/utils/storage";
import { useRouter } from "next/navigation";
import Loader from "@/app/loading";

import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import authService from "../services/authService";
import { apiEndpoints } from "../constants/apiEndpoints";
import { handleErrorToast } from "../utils/helperFunc";

const UserAuth = ({ type, setRoute, route }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);

  const router = useRouter();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const storedEmail = LocalStorageRepository.get("email");
    const storedPassword = LocalStorageRepository.get("password");

    if (storedEmail && storedPassword) {
      setValue("email", storedEmail);
      setValue("password", storedPassword);
      setRememberMe(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data) => {
    const { email, password } = data;
    setIsLoading(true);

    if (rememberMe) {
      LocalStorageRepository.set("email", email);
      LocalStorageRepository.set("password", password);
    }

    if (type === "signup") {
      authService
        .post(data, apiEndpoints.REGISTER)
        .then(() => {
          toast.success(toastMessage.SIGNUP_SUCCESS);
          toast.info(toastMessage.LOGIN_WITH_CREDENTIALS);
          setRoute(null);
          handleClose();
        })
        .catch((error) => {
          console.error(error);
          handleError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (type === "login") {
      authService
        .post(data, apiEndpoints.LOGIN)
        .then((response) => {
          toast.success(toastMessage.LOGIN_SUCCESS);
          LocalStorageRepository.set("blog-user", response);
          if (response) {
            authService.get(apiEndpoints.USER_PROFILE).then((userDetails) => {
              LocalStorageRepository.update("blog-user", userDetails);
            });
          }
          handleClose();
          setTimeout(() => {
            router.push("/");
          }, 300);
        })
        .catch((error) => {
          handleError(error);
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClose = useCallback(() => {
    setRoute(null);
    LocalStorageRepository.set("login-popup", {
      isOpen: false,
    });
    router.refresh();
  }, [router, setRoute]);

  return (
    <section className="fixed w-full h-screen top-0 left-0 bg-black/50 z-[1] flex justify-center items-center">
      <div className="md:w-[496px] lg:h-fit md:h-fit w-full h-full bg-white md:rounded-2xl pt-6 px-7 md:px-12 pb-9 relative duration-300">
        <div className="w-full h-full text-black bg flex flex-col gap-10">
          <div
            className="absolute top-3 right-6 text-[#A6B0C3] cursor-pointer"
            onClick={handleClose}
          >
            X
          </div>
          {!showForgetPass ? (
            <div className="w-full h-fit flex justify-center gap-10">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setRoute("login")}
              >
                <h1
                  className={
                    type !== "login"
                      ? "text-[#5D6A82] text-[22px] font-bold"
                      : "text-[22px] font-bold"
                  }
                >
                  Login
                </h1>
                {type === "login" && (
                  <div className="w-full mt-2 h-[5px] bg-black rounded-full"></div>
                )}
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setRoute("signup")}
              >
                <h1
                  className={
                    type !== "signup"
                      ? "text-[#5D6A82] text-[22px] font-bold"
                      : "text-[22px] font-bold"
                  }
                >
                  Sign Up
                </h1>
                {type !== "login" && (
                  <div className="w-full mt-2 h-[5px] bg-black rounded-full"></div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-fit flex justify-center gap-10">
              <div className="flex flex-col items-center cursor-pointer">
                <h1
                  className={
                    type !== "login"
                      ? "text-[#5D6A82] text-[22px] font-bold"
                      : "text-[22px] font-bold"
                  }
                >
                  Forget password
                </h1>
                <div className="w-full mt-2 h-[5px] bg-color-blue rounded-full"></div>
              </div>
            </div>
          )}
          {!showForgetPass && (
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 md:py-0 md:px-0"
            >
              {type == "signup" && (
                <div className="mb-5">
                  <InputWithError
                    label="Username"
                    placeholder="Enter your username.."
                    type="text"
                    register={register}
                    name="username"
                    requiredMessage="Your username is required"
                    autoComplete="username"
                    errors={errors}
                  />
                </div>
              )}
              <div className="mb-5">
                <InputWithError
                  label="Email address"
                  placeholder="Enter your email address.."
                  type="text"
                  register={register}
                  name="email"
                  requiredMessage="Your email is required"
                  autoComplete="email"
                  pattern={{
                    regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  }}
                  errors={errors}
                />
              </div>

              <div className="mb-5 relative">
                <InputWithError
                  label="Password"
                  placeholder="Enter your password..."
                  type={showPassword ? "text" : "password"}
                  register={register}
                  name="password"
                  autoComplete="current-password"
                  requiredMessage="Your Password is required"
                  errors={errors}
                />
                <div
                  className={`absolute right-3 ${
                    errors.password?.message ? "bottom-7" : "bottom-4"
                  }  cursor-pointer form__label mb-0`}
                  onClick={handleShowPassword}
                >
                  {showPassword ? (
                    <i className="ri-eye-fill"></i>
                  ) : (
                    <i className="ri-eye-off-fill"></i>
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-between mt-5 gap-5 text-sm"></div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full bg-black p-3 rounded-lg mt-4 text-white text-[18px] outline-none border-none hover:text-white hover:opacity-70"
                >
                  {isLoading ? (
                    <Loader />
                  ) : type == "login" ? (
                    "Login"
                  ) : (
                    "Signup"
                  )}
                </button>
              </div>
            </form>
          )}

          {showForgetPass && (
            <form
              noValidate
              onSubmit={handleSubmit(onForgetPassSubmit)}
              className="p-4 md:py-0 md:px-0"
            >
              <div className="absolute top-3 left-3 text-[#A6B0C3] cursor-pointer">
                <i
                  className="ri-arrow-left-circle-fill text-2xl"
                  onClick={() => setShowForgetPass(false)}
                ></i>
              </div>
              <div className="mb-5">
                <InputWithError
                  label="Email address"
                  placeholder="Enter your email address.."
                  type="text"
                  register={register}
                  name="email"
                  requiredMessage="Your email is required"
                  autoComplete="username"
                  pattern={{
                    regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  }}
                  errors={errors}
                />
              </div>
              <div className="mt-16">
                <button
                  type="submit"
                  className="w-full bg-primary-color text-white text-[18px] outline-none border-none hover:text-white hover:opacity-70"
                >
                  {isLoading ? <Loader /> : "Send reset password link"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserAuth;
