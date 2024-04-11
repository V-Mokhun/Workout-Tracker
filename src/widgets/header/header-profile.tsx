"use client";

import { PERSONAL_EXERCISES_ROUTE, PROFILE_ROUTE } from "@/shared/consts";
import { Dumbbell, LogOut, UserRound } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  ThemePicker,
} from "@/shared/ui";
import Image from "next/image";
import Link from "next/link";

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
          <li>
            <Link
              href={PROFILE_ROUTE}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              <UserRound className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href={PERSONAL_EXERCISES_ROUTE}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              <Dumbbell className="w-4 h-4" />
              <span>Your Exercises and Plans</span>
            </Link>
          </li>

          <Separator className="my-2" />
          <li className="mb-2">
            <ThemePicker />
          </li>
          <li>
            <a
              href="/api/auth/logout"
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
