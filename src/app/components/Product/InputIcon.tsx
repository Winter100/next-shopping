"use client";
import { Input } from "@material-tailwind/react";

interface InputIconProps {
  inputRef: any;
  ChangeHandler: (e: any) => void;
  type: string;
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
  type,
  name,
  label,
  id,
  value,
  icon,
  maxLength,
}: InputIconProps) {
  return (
    <div className="w-52 m-auto">
      <Input
        inputRef={inputRef}
        onChange={ChangeHandler}
        name={name}
        value={value}
        id={id}
        label={label}
        icon={icon}
        size="lg"
        type={type}
        maxLength={maxLength}
      />
    </div>
  );
}
