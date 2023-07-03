// import { OurFileRouter } from "@/app/api/uploadthing/core";
// import { generateComponents } from "@uploadthing/react";

// export const { UploadButton, UploadDropzone, Uploader } =
//   generateComponents<OurFileRouter>();

import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
