"use client";
import { Select, Option } from "@material-tailwind/react";
import { provinceList } from "./CityList";
import { useEffect, useState } from "react";

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

  function handleCityChange(value: string) {
    const selectedKeyword = value;
    const selectedCities =
      provinceList.find((province) => province.keyword === selectedKeyword)
        ?.value || [];

    setCities(selectedCities);

    selectedHandlChange("region", value);
    selectedHandlChange("city", "");
  }

  function handleSelectedCityChange(value: string) {
    selectedHandlChange("city", value);
    setSelectedClassName("");
  }

  useEffect(() => {
    if (selectedValue["region"]?.length > 1) {
      handleCityChange(selectedValue["region"]);
      // handleSelectedCityChange(selectedValue["city"]);
    }
  }, []);

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
          value={selectedValue["region"] || ""}
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
        <Select
          size="lg"
          label={"시"}
          name="city"
          labelProps={labelProps}
          color="blue"
          animate={{
            mount: { y: 0 },
            unmount: { y: 25 },
          }}
          onChange={(e) => handleSelectedCityChange(e)}
          // value={selectedRegion}
        >
          {cities?.map((city) => (
            <Option key={city} value={city}>
              {city}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
}
