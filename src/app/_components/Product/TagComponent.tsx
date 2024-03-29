"use client";

interface TagComponentProps {
  value?: string;
  text: string;
  valueColor?: string;
}

export default function TagComponent({ value, text }: TagComponentProps) {
  const bgColor = value === "yes" ? "bg-blue-100" : "bg-red-100";

  return (
    <div>
      <span
        className={` ${bgColor} text-xs px-2 py-0.5 rounded-full dark:bg-blue-900`}
      >
        {text}
      </span>
    </div>
  );
}
