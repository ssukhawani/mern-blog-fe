import { routeEndpoints } from "./routeEndpoints";

export const navLinksConstants = [
  {
    label: "Home",
    href: routeEndpoints.HOME,
  },
  {
    label: "My Blogs",
    href: routeEndpoints.BLOGS,
  },
];

export const navButtonConstants = [
  {
    label: "Log in",
    href: "/login",
  },
  {
    label: "Sign Up",
    href: "/signup",
    isOutlined: true,
  },
];
