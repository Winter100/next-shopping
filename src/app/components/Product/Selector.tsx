"use client";
import { Select, Option } from "@material-tailwind/react";

interface SelectorProps {
  label: string;
  option: OptionItem[];
  name: string;
  selectedHandlChange: (name: string, value: string) => void;
  selectedValue: any;
}

interface OptionItem {
  keyword: string;
  value: string;
}

export default function Selector({
  option,
  label,
  name,
  selectedHandlChange,
  selectedValue,
}: SelectorProps) {
  function handleChange(value: string) {
    selectedHandlChange(name, value);
  }

  return (
    <div className="w-52 m-auto">
      <Select
        size="lg"
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
