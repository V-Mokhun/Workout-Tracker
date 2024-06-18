"use client";

import { cn } from "@/shared/lib";
import { useToast } from "@/shared/ui";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { updateAccountAvatar } from "./actions";

interface AccountImageUploadProps {
  avatar: string;
}

export const AccountImageUpload = ({ avatar }: AccountImageUploadProps) => {
  const { toast } = useToast();

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      options={{
        multiple: false,
        folder: "users/avatars",
        tags: ["users", "avatars"],
        resourceType: "image",
        maxImageFileSize: 2_500_000, // 2.5MB
        singleUploadAutoClose: false,
      }}
      onSuccess={async (result, { close }) => {
        // @ts-ignore
        const url: string = result.info.secure_url;

        const response = await updateAccountAvatar(url);
        toast({
          title: response.message,
          variant: response.isError ? "destructive" : "success",
        });

        close();
      }}
    >
      {({ open, isLoading }) => {
        return (
          <button onClick={() => open()} disabled={isLoading}>
            <Image
              className={cn(
                "rounded-full object-cover aspect-square",
                isLoading && "opacity-50"
              )}
              alt="Your avatar"
              src={avatar}
              width={128}
              height={128}
            />
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
