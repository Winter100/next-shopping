"use client";
import { Select, Option } from "@material-tailwind/react";
import { provinceList } from "./CityList";
import { useEffect, useState } from "react";

interface PropsType {
  selectedValue: any;
  selectedHandlChange: any;
  setSelectedValue: any;
}

export default function CitySelector({
  selectedValue,
  selectedHandlChange,
  setSelectedValue,
}: PropsType) {
  const [cities, setCities] = useState<string[]>([]);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  function checkedHandler(value: string, isChecked: boolean) {
    if (isChecked) {
      setCheckedList((pre) => [...pre, value]);
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }

    return;
  }

  useEffect(() => {}, [checkedList]);

  function checkHandler(e: React.ChangeEvent<HTMLInputElement>, value: string) {
    selectedHandlChange("city", value);
    selectedHandlChange("city", "");
    setIsChecked(!isChecked);
    checkedHandler(value, e.target.checked);
  }

  function handleCityChange(value: string) {
    const selectedKeyword = value;

    const selectedCities =
      provinceList.find((province) => province.keyword === selectedKeyword)
        ?.value || [];

    setCheckedList([]);
    setCities(selectedCities);

    selectedHandlChange("region", value);
  }

  return (
    <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 py-4 gap-4 lg:py-2">
      <div className="w-52 m-auto " tabIndex={1}>
        <Select
          size="lg"
          label={"지역"}
          color="blue"
          name="region"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => handleCityChange(e)}
        >
          {provinceList?.map((item) => (
            <Option key={item.keyword} value={item.keyword}>
              {item.keyword}
            </Option>
          ))}
        </Select>
      </div>

      <div className="m-auto grid grid-cols-2 md:grid-cols-3 gap-4 border-2 shadow-lg p-4">
        {cities?.map((item, idx) => (
          <div key={`${item} ${idx}`} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-500"
              onChange={(e) => checkHandler(e, item)}
              checked={checkedList.includes(item)}
              value={item}
            />
            <label htmlFor={item} className="text-gray-700">
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
