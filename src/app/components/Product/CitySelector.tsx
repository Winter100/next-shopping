"use client";
import { Select, Option } from "@material-tailwind/react";
import { provinceList } from "./CityList";
import { useState } from "react";

interface SelectorProps {
  selectedHandlChange: (name: string, value: string) => void;
  selectRef?: React.MutableRefObject<any>;
  name?: string;
  selectedClassName?: string;
  setSelectedClassName: any;
  selectedValue: any;
}

export default function CitySelector({
  selectedHandlChange,
  selectRef,
  selectedClassName,
  name,
  setSelectedClassName,
  selectedValue,
}: SelectorProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [citiess, setCitiess] = useState<string>("");

  function handleCityChange(value: string) {
    const selectedKeyword = value;

    console.log("selectedKeyword", selectedKeyword);
    const selectedCities =
      provinceList.find((province) => province.keyword === selectedKeyword)
        ?.value || [];

    setCities(selectedCities);
    setCitiess("");
    handleSelectedCityChange("");
    selectedHandlChange("region", value);
    selectedHandlChange("city", "");
  }

  function handleSelectedCityChange(value: string) {
    console.log("value", value);
    selectedHandlChange("city", value);
    setCitiess(value);
    setSelectedClassName("");
  }

  const labelProps =
    name === selectedClassName
      ? {
          className: `text-red-600`,
        }
      : { className: "" };

  return (
    <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 py-4 gap-4 lg:py-2">
      <div className="w-52 m-auto " tabIndex={1} ref={selectRef}>
        <Select
          size="lg"
          labelProps={labelProps}
          label={"지역"}
          color="blue"
          name="region"
          value={selectedValue.region || ""}
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

      <div className="w-52 m-auto" tabIndex={1}>
        {/* <Select
            size="lg"
            label={"시"}
            name="city"
            labelProps={labelProps}
            color="blue"
            value={citiess}
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={(e) => handleSelectedCityChange(e)}
          >
            {cities?.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select> */}

        <Select
          size="lg"
          label={"시"}
          name="city"
          labelProps={labelProps}
          color="blue"
          // value={cities.find((item) => item === citiess)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => handleSelectedCityChange(e)}
        >
          {cities?.map((city, idx) => (
            <Option key={city + idx} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
      {citiess}
    </div>
  );
}
