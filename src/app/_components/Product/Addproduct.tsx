"use client";
import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useUploadThing } from "@/utils/uploadthing";
import { isFieldEmpty } from "@/utils/utils";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Selector from "./Selector";
import { InputIcon } from "./InputIcon";
import CitySelector from "./CitySelector";
import { available } from "@/app/_lib/constants-url";

interface AddProductProps {
  editData: any;
  method: string;
}

export default function AddProcuct({ editData = "", method }: AddProductProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      //이미지 업로드 완료시
      const suc = "성공";
      return suc;
    },
    onUploadError: () => {
      //이미지 업로드 실패시
    },
  });

  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(
    editData?.mainImageSrc || ""
  );
  const [subImage, setSubImage] = useState<string[] | null>(
    editData?.subImageSrc || []
  );
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<File[]>(null);
  const [subfiles, setSubFiles] = useState<File[]>(null);
  const [price, setPrice] = useState<number | null>(editData?.price || "");
  const [title, setTitle] = useState<string | null>(editData?.title || "");
  const [contact, setContact] = useState<string | null>(
    editData?.contact || ""
  );

  const [region, setRegion] = useState(editData?.region || "서울특별시");
  const [checkedList, setCheckedList] = useState<string[]>(
    editData?.checkedList || []
  );

  const [cities, setCities] = useState<string[]>([]);

  const [selectedValue, setSelectedValue] = useState({
    random: editData?.selectedValue?.random || "",
    isMeet: editData?.selectedValue?.isMeet || "",
    bargaining: editData?.selectedValue?.bargaining || "",
  });
  const [selectedClassName, setSelectedClassName] = useState("");
  const [description, setDescription] = useState(editData?.description || "");

  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/in");
    },
  });

  function selectedHandlChange(name: string, value: string) {
    if (name === "isMeet" && value === "no") {
      setRegion("");
      setCheckedList([]);
    }
    setSelectedValue((prevSelectedValue) => ({
      ...prevSelectedValue,
      [name]: value,
    }));
  }

  function contactChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setContact(e.target.value);
    setMessage("");
  }
  function titleChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    setMessage("");
  }
  function priceChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const numericValue = Number(inputValue);

    if (!isNaN(numericValue) && inputValue.length <= 10) {
      setPrice(numericValue);
      setMessage("");
    }
  }
  function descriptionChangeHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
    setMessage("");
  }

  async function mainUploadStart(image: any) {
    const images = await startUpload(image);

    return images[0]?.fileUrl;
  }
  async function subUploadStart(image: any) {
    const images = await startUpload(image);
    const subImageSrc = images?.map((item) => item?.fileUrl);
    return subImageSrc;
  }

  const allowedMimeTypes = ["image/png", "image/jpeg"];

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      const fileSizeInMb = file.size / (1024 * 1024);

      if (!allowedMimeTypes.includes(file.type)) {
        alert("jpeg, png 파일만 업로드 가능합니다.");
        return;
      }

      if (fileSizeInMb > 4) {
        alert("파일 크기가 4MB를 초과합니다. 더 작은 파일을 선택해주세요.");
        e.target.value = "";
        setMessage("");
        return;
      }
    }
    setFiles([file]);
    setMessage("");
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = reader.result as string;
        setImage(image);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }

    return;
  }

  function handleSubImageChage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const selectedImageUrls: any[] = [];
    const addFiles = [];

    selectedImageUrls.length = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const fileSizeInMB = file.size / (1024 * 1024);

      if (!allowedMimeTypes.includes(file.type)) {
        alert("jpeg, png 파일만 업로드 가능합니다.");
        continue;
      }

      if (subImage.length + addFiles.length >= 10) {
        alert("최대 10개의 이미지만 업로드 가능합니다.");
        e.target.value = "";
        break;
      }

      if (fileSizeInMB > 4) {
        alert("4MB를 초과하는 파일은 업로드할 수 없습니다.");
        continue;
      }

      addFiles.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        selectedImageUrls.push(reader.result);
        if (selectedImageUrls.length === addFiles.length) {
          setSubImage((prevImages) => [...prevImages, ...selectedImageUrls]);
        }
      };

      reader.readAsDataURL(file);
    }

    setSubFiles(addFiles);

    return;
  }

  const titleInputRef = useRef(null);
  const priceInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const contactInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const selectIsMeetRef = useRef(null);
  const selectIsbargaining = useRef(null);
  const selectIsRandom = useRef(null);
  const selectIsRegion = useRef(null);
  const MAXLENGTH = 20;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    const fieldsToValidate = [
      { ref: titleInputRef, value: title, name: "제목", maxLength: MAXLENGTH },
      {
        ref: contactInputRef,
        value: contact,
        name: "카카오톡",
        maxLength: MAXLENGTH,
      },
      { ref: priceInputRef, value: price, name: "가격" },
      { ref: descriptionInputRef, value: description, name: "상품설명" },
      { ref: imageInputRef, value: image, name: "대표 이미지" },
      {
        ref: selectIsbargaining,
        value: selectedValue?.bargaining,
        name: "흥정여부",
        className: "bargaining",
      },
      {
        ref: selectIsRandom,
        value: selectedValue?.random,
        name: "택배거래",
        className: "random",
      },
      {
        ref: selectIsMeetRef,
        value: selectedValue?.isMeet,
        name: "직거래",
        className: "isMeet",
      },
    ];

    if (selectedValue?.isMeet === "yes") {
      fieldsToValidate.push(
        {
          ref: selectIsRegion,
          value: region,
          name: "지역",
          className: "region",
        },
        {
          ref: selectIsRegion,
          value: checkedList.join(", "),
          name: "시",
          className: "region",
        }
      );
    }

    for (const field of fieldsToValidate) {
      if (field.maxLength && field.value.trim().length > field.maxLength) {
        field.ref.current.focus();
        setMessage(
          `${field.name}은(는) ${field.maxLength}자 이하로 입력해주세요.`
        );
        setIsLoading(false);
        return;
      }
      if (isFieldEmpty(field.value)) {
        field.ref.current.focus();
        setMessage(`${field.name}을(를) 채워주세요.`);
        setIsLoading(false);
        setSelectedClassName(field.className);
        return;
      }
    }

    const uploadedSubImages = subfiles ? await subUploadStart(subfiles) : [];
    const filteredSubImage = subImage.filter((imageUrl) => {
      return !imageUrl.startsWith("data:image");
    });

    const finalSubImage = [...filteredSubImage, ...uploadedSubImages];

    if (data?.user) {
      const requestData = {
        title,
        description,
        price,
        selectedValue,
        mainImageSrc: files ? await mainUploadStart(files) : image,
        subImageSrc: finalSubImage,
        region,
        checkedList,
        contact,
        email: data.user.email,
        name: data.user.name,
        _id: method === "PATCH" ? editData._id : null,
      };

      try {
        const response = await fetch("/api/editproduct/edit/addedit", {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (response.status === 200) {
          method === "PATCH"
            ? (window.location.href = "/profile/myproducts")
            : (window.location.href = available);
          return;
        }
      } catch (error) {
        router.push("/auth/in");
      }
    }

    router.push("/auth/in");
  }

  function renderSelector(
    label: string,
    name: string,
    ref: React.MutableRefObject<any>,
    option: any
  ) {
    return (
      <Selector
        disabled={isLoading}
        selectRef={ref}
        label={label}
        name={name}
        option={option}
        selectedHandlChange={selectedHandlChange}
        selectedValue={selectedValue}
        selectedClassName={selectedClassName}
        setSelectedClassName={setSelectedClassName}
      />
    );
  }

  const loadingBgClass = isLoading ? "bg-gray-100" : "";
  const loadingHoverClass = isLoading
    ? ""
    : "hover:cursor-pointer hover:font-bold";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  function handleMouseEnter(index: number) {
    setHoveredIndex(index);
  }

  function handleMouseLeave() {
    setHoveredIndex(null);
  }

  function removeSubImage(index: number) {
    if (isLoading) {
      return;
    }
    const updatedSubImage = [...subImage];
    updatedSubImage.splice(index, 1);
    setSubImage(updatedSubImage);
  }

  return (
    <form className="container mx-auto py-4" onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 h-full">
        <div className="flex flex-col md:flex-row">
          <div className=" md:w-[400px] h-full border">
            <div className=" h-[400px] md:h-[570px] relative">
              {image && (
                <Image
                  className="w-full h-full"
                  src={image}
                  alt="이미지"
                  fill
                />
              )}
            </div>
            {!isLoading && (
              <div className={`${loadingBgClass} text-center border-t`}>
                <input
                  disabled={isLoading}
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                  id="mainImage"
                  accept="image/png, image/jpeg"
                  name="imageSrc"
                  ref={imageInputRef}
                />
                <div className={`px-1 py-1 text-gray-600 rounded-lg  `}>
                  <label
                    htmlFor="mainImage"
                    className={`${loadingHoverClass} text-sm `}
                  >
                    대표 이미지 업로드
                    <span className={`text-xs`}> (최대:4MB)</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="md:w-1/2 md:ml-8">
            <div className="text-gray-800 text-center my-2">
              <label className="block text-xl font-bold my-2" htmlFor="title">
                제목
              </label>
              <input
                disabled={isLoading}
                onChange={titleChangeHandler}
                ref={titleInputRef}
                value={title}
                id="title"
                name="title"
                type="text"
                placeholder="최대 20자"
                maxLength={MAXLENGTH}
                className={`${
                  isLoading ? "bg-gray-100" : ""
                } w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500`}
              />
            </div>

            <div className=" border-t-2 pt-2 mt-2">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                판매 옵션
              </h2>
              <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 gap-4 py-3">
                <div className="w-52 m-auto">
                  <InputIcon
                    disabled={isLoading}
                    ChangeHandler={contactChangeHandler}
                    inputRef={contactInputRef}
                    value={contact}
                    maxLength={20}
                    name="contact"
                    id="contact"
                    label="카카오톡 아이디"
                    icon=""
                  />
                </div>
                <div className="w-52 m-auto">
                  <InputIcon
                    disabled={isLoading}
                    ChangeHandler={priceChangeHandler}
                    inputRef={priceInputRef}
                    value={price}
                    maxLength={20}
                    name="price"
                    id="price"
                    label="가격"
                    icon="원"
                  />
                </div>
              </div>

              <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 gap-4 border-y-2 py-3">
                {renderSelector("흥정여부", "bargaining", selectIsbargaining, [
                  { keyword: "가능", value: "yes" },
                  { keyword: "불가능", value: "no" },
                ])}
                {renderSelector("택배거래", "random", selectIsRandom, [
                  { keyword: "가능", value: "yes" },
                  { keyword: "불가능", value: "no" },
                ])}
              </div>
              <div className="m-auto">
                <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 gap-4 py-3">
                  {renderSelector("직거래", "isMeet", selectIsMeetRef, [
                    { keyword: "가능", value: "yes" },
                    { keyword: "불가능", value: "no" },
                  ])}
                </div>
                <div className="m-auto grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                  {selectedValue.isMeet === "yes" && (
                    <CitySelector
                      disabled={isLoading}
                      region={region}
                      selectIsRegion={selectIsRegion}
                      selectedClassName={selectedClassName}
                      setSelectedClassName={setSelectedClassName}
                      setRegion={setRegion}
                      checkedList={checkedList}
                      setCheckedList={setCheckedList}
                      cities={cities}
                      setCities={setCities}
                    />
                  )}
                  <></>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end border-t-2 ">
              <span className="font-bold text-2xl">
                {price?.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="m-auto mt-6 w-full md:w-3/4 ">
          <div className="m-auto grid grid-cols-2 gap-3 md:gap-1 md:w-full md:grid-cols-5 ">
            {subImage.map((imageUrl, index) => (
              <div
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => removeSubImage(index)}
                key={index}
                className={`relative ${
                  isLoading ? "" : "hover:cursor-pointer"
                } h-32 md:h-36 border`}
              >
                {hoveredIndex === index && !isLoading && (
                  <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-gray-600 text-transparent hover:text-red-600  hover:bg-opacity-60 m-0 p-0 z-10 ">
                    <span className="text-2xl m-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      X
                    </span>
                  </div>
                )}
                <Image fill src={imageUrl} alt={`Image ${index}`} />
              </div>
            ))}
          </div>

          {!isLoading && (
            <div className={`${loadingBgClass} text-center border-t`}>
              <input
                disabled={isLoading}
                type="file"
                multiple
                onChange={handleSubImageChage}
                className="hidden"
                id="subImage"
                accept="image/png, image/jpeg"
                name="subimageSrc"
              />

              <label
                htmlFor="subImage"
                className={`${loadingHoverClass} text-sm`}
              >
                그 외 이미지 업로드
                {/* <span className=" text-xs"> (4Mb씩 최대 10개)</span> */}
                <span className=" text-xs">{` (${subImage?.length}/10)`}</span>
              </label>
            </div>
          )}
        </div>

        <div className="mt-10">
          <label htmlFor="description" className="block text-center text-2xl">
            내용
          </label>
          <textarea
            disabled={isLoading}
            onChange={descriptionChangeHandler}
            ref={descriptionInputRef}
            value={description}
            name="description"
            id="description"
            className={`${loadingBgClass} resize-none w-full  border rounded p-2 lg:h-[800px] h-[600px]`}
          />
        </div>
        <div className="text-center">
          {isLoading ? (
            <button
              disabled={isLoading}
              className="w-fit mx-auto ml-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded"
            >
              <LoadingSpinner />
            </button>
          ) : (
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
            >
              {method === "PATCH" ? "수정하기" : "등록"}
            </button>
          )}
          <p>{message}</p>
        </div>
      </div>
    </form>
  );
}
