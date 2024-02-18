import { UserIcon } from "@/app/shared/Icons/User";
import Link from "next/link";

const ProfileIcon = () => {
  return (
    <Link
      href={"/profile"}
      className="h-6 w-6 md:w-8 md:h-8 border-[1px] border-color-blue rounded-full flex items-center justify-center cursor-pointer"
    >
      <UserIcon fill={"white"} width="14" height="14" />
    </Link>
  );
};

export default ProfileIcon;
