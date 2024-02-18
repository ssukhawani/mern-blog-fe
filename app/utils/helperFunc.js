"use client";
import { toast } from "react-toastify";
import { logMessage } from "../constants/logMessage";

const errors = {
  400: logMessage.BAD_REQUEST,
  401: logMessage.UN_AUTHORIZED,
  403: logMessage.PERMISSION_DENIED,
  404: logMessage.INVALID_REQUEST,
  500: logMessage.SERVER_ERROR,
};

function getTheErrorMessage(status) {
  return errors[status];
}

export function handleErrorToast(error) {
  if (error && error.response) {
    Object.entries(error.response.data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((error) => {
          toast.error(error, {
            toastId: key,
          });
        });
      } else {
        if (key === "message") {
          toast.error(value, {
            toastId: key,
          });
        }
      }
    });
  } else {
    toast.error(getTheErrorMessage(error.status));
  }
}

export function formatDate(inputDate) {
  // Parse the input date string
  const date = new Date(inputDate);

  // Define month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, month, and year components
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}
