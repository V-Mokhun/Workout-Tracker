"use client";

import { useRef, useState } from "react";
import { Control } from "react-hook-form";
import Image from "next/image";
import { AddExerciseFormSchema } from "./add-exercise-model";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { DEFAULT_EXERCISE_IMAGE } from "@/shared/consts";
import { UploadCloudIcon, XCircleIcon } from "lucide-react";

interface AddExerciseImageUploadProps {
  control: Control<AddExerciseFormSchema>;
}

export const AddExerciseImageUpload = ({
  control,
}: AddExerciseImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(DEFAULT_EXERCISE_IMAGE);

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (onChange: (value: File | null) => void) => {
    setPreviewUrl(DEFAULT_EXERCISE_IMAGE);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <FormField
      control={control}
      name="image"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem className="w-full">
          <FormLabel className="text-lg" htmlFor="exercise-image">
            Image
          </FormLabel>
          <FormControl>
            <div
              className="relative w-full max-w-80 md:w-80 lg:w-96 h-56 md:h-64 cursor-pointer group overflow-hidden rounded-md"
              onClick={handleImageClick}
            >
              <Image
                src={previewUrl}
                alt="Exercise preview"
                fill
                className="rounded-md object-cover transition-transform duration-300 group-hover:scale-110 aspect-auto md:aspect-[8/5]"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 md:bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-semibold md:opacity-0 opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  <UploadCloudIcon className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="hidden md:inline">Click to upload</span>
                  <span className="md:hidden">Upload</span>
                </span>
              </div>
              {previewUrl !== DEFAULT_EXERCISE_IMAGE && (
                <button
                  type="button"
                  className="absolute top-2 right-2 p-1 bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-300 hover:bg-red-500 hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(onChange);
                  }}
                >
                  <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-inherit" />
                </button>
              )}
              <Input
                {...fieldProps}
                id="exercise-image"
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={(e) => {
                  handleImageChange(e);
                  onChange(e.target?.files && e.target.files[0]);
                }}
                ref={inputRef}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
