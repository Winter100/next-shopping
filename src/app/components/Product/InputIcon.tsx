"use client";
import { Input } from "@material-tailwind/react";

interface InputIconProps {
  inputRef: any;
  ChangeHandler: (e: any) => void;
  disabled: boolean;
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
  disabled,
  name,
  label,
  id,
  value,
  icon,
  maxLength,
}: InputIconProps) {
  return (
    <div className="w-full m-auto">
      <Input
        autoComplete="off"
        disabled={disabled}
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
