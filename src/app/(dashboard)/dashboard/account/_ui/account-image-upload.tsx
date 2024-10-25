"use client";

import { cn, getPublicIdFromUrl } from "@/shared/lib";
import { useToast } from "@/shared/ui";
import { CloudUploadIcon } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { deleteOldAvatar, updateAccountAvatar } from "./actions";

interface AccountImageUploadProps {
  avatar: string;
  userId: string;
}

export const AccountImageUpload = ({
  avatar,
  userId,
}: AccountImageUploadProps) => {
  const { toast } = useToast();

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      options={{
        multiple: false,
        folder: "users/avatars",
        tags: ["users", "avatars", userId],
        resourceType: "image",
        maxImageFileSize: 2_500_000, //? 2.5MB
        singleUploadAutoClose: false,
      }}
      onSuccess={async (result, { close }) => {
        // @ts-ignore
        const url: string = result.info.secure_url;

        const publicId = getPublicIdFromUrl(avatar);
        if (publicId) {
          const { message, isError } = await deleteOldAvatar(publicId);
          if (isError) {
            toast({
              title: message,
              variant: "destructive",
            });
            return;
          }
        }

        const response = await updateAccountAvatar(url);
        toast({
          title: response.message,
          variant: response.isError ? "destructive" : "success",
        });

        close();
      }}
      onError={(err, { close }) => {
        toast({
          title: "Something went wrong",
          description: `${
            typeof err === "string"
              ? err
              : err?.statusText ?? "Please try again later."
          }`,
          variant: "destructive",
        });

        close();
      }}
    >
      {({ open, isLoading }) => {
        return (
          <button
            className="group relative flex items-center justify-center w-full rounded-full overflow-hidden after:absolute after:w-full after:h-full after:inset-0 after:opacity-0 after:bg-white/80 after:transition-opacity hover:after:opacity-100"
            onClick={() => open()}
            disabled={isLoading}
          >
            <Image
              className={cn(
                "rounded-full object-cover aspect-square overflow-hidden shrink-0",
                isLoading && "opacity-50"
              )}
              alt="Your avatar"
              src={avatar}
              width={128}
              height={128}
            />
            <CloudUploadIcon className="group-hover:opacity-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-0 transition-opacity z-[1]" />
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
