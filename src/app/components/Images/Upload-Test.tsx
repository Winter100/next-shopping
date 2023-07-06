"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { useCallback, useState } from "react";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";

export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      const suc = "성공";
      return suc;
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  async function uploadStart(files: any) {
    const result = await startUpload(files);
    console.log(result);
  }

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} type="file" accept="image/*" />
        이미지 선택하기
      </div>
      <div>
        {files.length > 0 && (
          <button onClick={() => uploadStart(files)}>업로드하기</button>
        )}
      </div>
    </>
  );
}
