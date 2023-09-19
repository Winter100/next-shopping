"use client";
import { Select, Option } from "@material-tailwind/react";

interface SelectorProps {
  label: string;
  option: OptionItem[];
  name: string;
  selectedHandlChange: (name: string, value: string) => void;
  selectedValue: any;
  selectRef?: React.MutableRefObject<any>;
  selectedClassName?: string;
  setSelectedClassName: any;
  disabled: boolean;
}

interface OptionItem {
  keyword: string;
  value: string;
}

export default function Selector({
  option,
  disabled,
  label,
  name,
  selectedHandlChange,
  selectedValue,
  selectRef,
  selectedClassName,
  setSelectedClassName,
}: SelectorProps) {
  function handleChange(value: string) {
    selectedHandlChange(name, value);
    setSelectedClassName("");
  }

  const labelProps =
    name === selectedClassName
      ? {
          className: `${""} text-red-600`,
        }
      : { className: "" };

  return (
    <div className="w-52 m-auto" tabIndex={1} ref={selectRef}>
      <Select
        disabled={disabled}
        size="lg"
        labelProps={labelProps}
        label={label}
        color="blue"
        value={selectedValue[name]}
        name={name}
        onChange={handleChange}
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        {option.map((item) => (
          <Option key={item.keyword} value={item.value}>
            {item.keyword}
          </Option>
        ))}
      </Select>
    </div>
  );
}
