"use client";
import { Select, Option } from "@material-tailwind/react";
import { provinceList } from "./CityList";
import { useState } from "react";

interface SelectorProps {
  selectedHandlChange: (name: string, value: string) => void;
  selectRef?: React.MutableRefObject<any>;
  name?: string;
}

export default function CitySelector({ selectedHandlChange }: SelectorProps) {
  const [cities, setCities] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  function handleCityChange(value: string) {
    const selectedKeyword = value;
    setSelectedRegion(selectedKeyword);
    const selectedCities =
      provinceList.find((province) => province.keyword === selectedKeyword)
        ?.value || [];
    setCities(selectedCities);
    selectedHandlChange("region", value);
  }

  function handleSelectedCityChange(value: string) {
    selectedHandlChange("city", value);
  }

  return (
    <div className="m-auto">
      <div className="w-52" tabIndex={1}>
        <div>
          <Select
            size="lg"
            label={"지역"}
            color="blue"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={handleCityChange}
          >
            {provinceList.map((item) => (
              <Option key={item.keyword} value={item.keyword}>
                {item.keyword}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      {selectedRegion && (
        <div className="w-52 my-4" tabIndex={1}>
          <Select
            size="lg"
            label={"시"}
            color="blue"
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            onChange={handleSelectedCityChange}
          >
            {cities.map((city) => (
              <Option key={city} value={city}>
                {city}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
}
