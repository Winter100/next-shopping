"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import { useUploadThing } from "@/utils/uploadthing";
import { isFieldEmpty } from "@/utils/utils";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import Selector from "./Selector";
import { InputIcon } from "./InputIcon";
import { provinceList } from "./CityList";
import CitySelector from "./CitySelector";

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

  const [selectedValue, setSelectedValue] = useState({
    random: editData?.selectedValue?.random || "",
    isMeet: editData?.selectedValue?.isMeet || "",
    bargaining: editData?.selectedValue?.bargaining || "",
    region: editData?.selectedValue?.region || "",
    city: editData?.selectedValue?.city || "",
  });
  const [description, setDescription] = useState(editData?.description || "");

  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("auth/in");
    },
  });

  useEffect(() => {
    console.log(selectedValue.region);
    console.log(selectedValue.city);
  }, [selectedValue]);

  function selectedHandlChange(name: string, value: string) {
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

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
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

    if (files.length > 10) {
      alert("최대 10개의 이미지까지 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      addFiles.push(file);

      const reader = new FileReader();

      reader.onload = () => {
        selectedImageUrls.push(reader.result);
        if (selectedImageUrls.length === files.length) {
          setSubImage(selectedImageUrls);
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
      { ref: selectIsMeetRef, value: selectedValue?.isMeet, name: "직거래" },
      { ref: selectIsRandom, value: selectedValue?.random, name: "택배거래" },
      {
        ref: selectIsbargaining,
        value: selectedValue?.bargaining,
        name: "흥정여부",
      },
    ];

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
        return;
      }
    }

    console.log(selectedValue.region);
    console.log(selectedValue.city);

    return;

    if (data?.user) {
      const requestData = {
        title,
        description,
        price,
        selectedValue,
        mainImageSrc: files ? await mainUploadStart(files) : image,
        subImageSrc: subfiles ? await subUploadStart(subfiles) : subImage,
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
          window.location.href = "/product/search?keyword=all&page=1";
          return;
        }
      } catch (error) {
        router.push("/auth/in");
      }
    }

    router.push("/auth/in");
  }

  return (
    <form className="container mx-auto py-8" onSubmit={handleSubmit}>
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 h-full">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[480px]">
            <div className="border-2 h-[600px] relative">
              {image && (
                <Image
                  className="w-full h-full"
                  src={image}
                  alt="이미지"
                  fill
                />
              )}
            </div>
            <div className="text-center mt-2 ">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                id="mainImage"
                accept="image/*"
                name="imageSrc"
                ref={imageInputRef}
              />
              <label
                htmlFor="mainImage"
                className="bg-zinc-100 px-1 py-1 text-gray-600 rounded-lg cursor-pointer hover:text-black hover:font-bold"
              >
                대표 이미지 업로드
              </label>
            </div>
          </div>

          <div className="md:w-1/2 md:ml-8">
            <div className="text-4xl font-semibold text-gray-800 text-center mt-10 mb-10">
              <label className="block font-bold mb-1" htmlFor="title">
                제목
              </label>
              <input
                onChange={titleChangeHandler}
                ref={titleInputRef}
                value={title}
                id="title"
                name="title"
                type="text"
                placeholder="최대 20자"
                maxLength={MAXLENGTH}
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className=" border-y-2 py-6 my-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                판매 옵션
              </h2>
              <div className="m-auto grid grid-cols-1 md:grid-cols-2 gap-4 my-8 border-b-2 py-4">
                <InputIcon
                  ChangeHandler={contactChangeHandler}
                  inputRef={contactInputRef}
                  value={contact}
                  maxLength={20}
                  name="contact"
                  id="contact"
                  label="카카오톡 아이디"
                  icon=""
                />
                <InputIcon
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

              <div className="m-auto grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <Selector
                  selectRef={selectIsbargaining}
                  label={"흥정여부"}
                  name={"bargaining"}
                  option={[
                    { keyword: "가능", value: "yes" },
                    { keyword: "불가능", value: "no" },
                  ]}
                  selectedHandlChange={selectedHandlChange}
                  selectedValue={selectedValue}
                />
                <Selector
                  selectRef={selectIsRandom}
                  label={"택배거래"}
                  name={"random"}
                  option={[
                    { keyword: "가능", value: "yes" },
                    { keyword: "불가능", value: "no" },
                  ]}
                  selectedHandlChange={selectedHandlChange}
                  selectedValue={selectedValue}
                />
                <Selector
                  selectRef={selectIsMeetRef}
                  label={"직거래"}
                  name={"isMeet"}
                  option={[
                    { keyword: "가능", value: "yes" },
                    { keyword: "불가능", value: "no" },
                  ]}
                  selectedHandlChange={selectedHandlChange}
                  selectedValue={selectedValue}
                />
                <div></div>
                <div className="m-auto">
                  {selectedValue.isMeet === "yes" ? (
                    <CitySelector selectedHandlChange={selectedHandlChange} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center my-6 justify-end">
              <span className="font-bold text-2xl">
                {price?.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-2">
          <div className="m-auto">
            <div className="flex flex-wrap items-center">
              {subImage.map((imageUrl, index) => (
                <div
                  key={index}
                  className=" items-center relative w-1/5 h-44 border-2"
                >
                  <Image fill src={imageUrl} alt={`Image ${index}`} />
                </div>
              ))}
            </div>

            <div className="text-center mt-2">
              <input
                type="file"
                multiple
                onChange={handleSubImageChage}
                className="hidden"
                id="subImage"
                accept="image/*"
                name="subimageSrc"
              />
              <label
                htmlFor="subImage"
                className="bg-zinc-100 px-1 py-1 text-gray-600 rounded-lg cursor-pointer hover:text-black hover:font-bold"
              >
                그 외 이미지 업로드
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <label htmlFor="description" className="block text-center text-2xl">
            내용
          </label>
          <textarea
            onChange={descriptionChangeHandler}
            ref={descriptionInputRef}
            value={description}
            name="description"
            id="description"
            className="resize-none w-full  border rounded p-2 lg:h-[800px] h-[600px]"
          />
        </div>
        <div className="text-center">
          {!isLoading && (
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700"
            >
              {method === "PATCH" ? "수정하기" : "등록"}
            </button>
          )}
          {isLoading && (
            <button className="w-fit mx-auto ml-4 px-4 py-2 bg-gray-800 text-white font-semibold rounded hover:bg-gray-700">
              <LoadingSpinner />
            </button>
          )}
          <p>{message}</p>
        </div>
      </div>
    </form>
  );
}
