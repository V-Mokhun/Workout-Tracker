import { ALLOWED_IMAGE_EXTENSIONS } from "@/shared/consts";

export const validateImage = (file: File) => {
  const extension = file.name.split(".").pop();
  return extension && ALLOWED_IMAGE_EXTENSIONS.includes(extension);
};
