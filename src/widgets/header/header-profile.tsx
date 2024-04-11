"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";
import Image from "next/image";

interface HeaderProfileProps {
  user: any;
}

export const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage asChild src={user.picture}>
            <Image src={user.picture} alt="Profile" width={40} height={40} />
          </AvatarImage>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
