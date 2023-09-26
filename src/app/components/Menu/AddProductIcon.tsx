"use client";

import { usePathname } from "next/navigation";

export default function AddProductIcon() {
  const pathName = usePathname()?.includes("newproduct");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${
        pathName ? "text-purple-600" : ""
      } feather feather-edit-2 hover:text-purple-600`}
    >
      <path
        fill="current"
        d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
      ></path>
    </svg>
  );
}
