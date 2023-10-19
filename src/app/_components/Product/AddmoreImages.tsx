"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const selectedImageUrls: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const reader = new FileReader();

      reader.onload = () => {
        selectedImageUrls.push(reader.result);
        if (selectedImageUrls.length === files.length) {
          setSelectedImages(selectedImageUrls);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-auto">
      <div className="flex items-center justify-center w-full h-full">
        {selectedImages.map((imageUrl, index) => (
          <div key={index} className="border-2">
            <Image
              width={300}
              height={300}
              src={imageUrl}
              alt={`Image ${index}`}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
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
  );
}
