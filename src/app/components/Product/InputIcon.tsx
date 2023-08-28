"use client";
import { Input } from "@material-tailwind/react";

interface InputIconProps {
  inputRef: any;
  ChangeHandler: (e: any) => void;

  name: string;
  id: string;
  label: string;
  value: any;
  icon?: string;
  maxLength?: number;
}

export function InputIcon({
  inputRef,
  ChangeHandler,

  name,
  label,
  id,
  value,
  icon,
  maxLength,
}: InputIconProps) {
  return (
    <div className=" w-52 m-auto">
      <Input
        inputRef={inputRef}
        onChange={ChangeHandler}
        name={name}
        value={value}
        id={id}
        icon={icon}
        size="md"
        maxLength={maxLength}
        label={label}
      />
    </div>
  );
}
