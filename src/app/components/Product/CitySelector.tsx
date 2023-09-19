"use client";
import { Select, Option } from "@material-tailwind/react";
import { provinceList } from "./CityList";
import { useState } from "react";

interface PropsType {
  selectIsRegion: React.MutableRefObject<any>;
  checkedList: string[];
  setCheckedList: React.Dispatch<any>;
  region: string;
  setRegion: React.Dispatch<any>;
  cities?: string[];
  setCities?: React.Dispatch<any>;
  selectedClassName: string;
  setSelectedClassName: React.Dispatch<any>;
  disabled: boolean;
}

export default function CitySelector({
  selectIsRegion,
  disabled,
  checkedList,
  setCheckedList,
  region,
  setRegion,
  selectedClassName,
  setSelectedClassName,
}: PropsType) {
  const [isChecked, setIsChecked] = useState(false);
  const [cities, setCities] = useState<string[]>(
    provinceList?.find((item) => item?.keyword === region)?.value || []
  );

  function regionChangeHandler(region: string) {
    const findCityArr =
      provinceList?.find((item) => item?.keyword === region)?.value || [];

    setRegion(region);
    setCities(findCityArr);
    setCheckedList([]);
  }

  function checkedItemHandler(value: string, isChecked: boolean) {
    if (isChecked) {
      setCheckedList((prev: any) => [...prev, value]);

      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item: any) => item !== value));

      return;
    }

    return;
  }

  function checkHandler(e: React.ChangeEvent<HTMLInputElement>, value: string) {
    setSelectedClassName("");
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  }

  const checkboxBorder = "region" === selectedClassName ? "border-red-600" : "";
  const labelClassName =
    "region" === selectedClassName
      ? {
          className: `text-red-600`,
        }
      : { className: "" };

  const loadingBgClass = disabled ? "bg-gray-200" : "";

  return (
    <div className="m-auto">
      <div
        className={`w-52 relative text-center z-10`}
        tabIndex={1}
        ref={selectIsRegion}
      >
        <Select
          disabled={disabled}
          labelProps={labelClassName}
          size="lg"
          label={"지역"}
          color="blue"
          name="region"
          value={region || ""}
          onChange={regionChangeHandler}
          lockScroll={true}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
        >
          {provinceList?.map((item) => (
            <Option key={item.keyword} value={item.keyword} disabled={disabled}>
              {item.keyword}
            </Option>
          ))}
        </Select>
        <></>
      </div>

      <div className={` lg:mb-48 mb-2 `}>
        {region?.length > 1 && (
          <div
            className={`   lg:absolute lg:w-96 w-52 bg-white grid lg:grid-cols-${
              cities?.length >= 4 ? "4" : "2"
            }  gap-2 border-2 shadow-lg p-2 ${checkboxBorder} ${
              cities?.length < 4 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {cities?.map((item, idx) => (
              <div
                key={`${item} ${idx}`}
                className={`  flex items-center justify-left space-x-2 text-xs`}
              >
                <input
                  disabled={disabled}
                  type="checkbox"
                  className={`${loadingBgClass} w-3 h-3 text-blue-500`}
                  id={item}
                  value={item}
                  name="city"
                  checked={checkedList?.includes(item)}
                  onChange={(e) => checkHandler(e, item)}
                />
                <label htmlFor={item} className="text-gray-700">
                  {item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
