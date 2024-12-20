"use client";

import { AuthUser } from "@/shared/api";
import {
  DEFAULT_PROFILE_IMAGE,
  PROFILE_ROUTE,
  USER_EXERCISES_ROUTE,
} from "@/shared/consts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  ThemePicker,
} from "@/shared/ui";
import { BookmarkIcon, LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface HeaderProfileProps {
  user: AuthUser;
}

export const HeaderProfile = ({ user }: HeaderProfileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Image
          className="aspect-square h-10 w-10 rounded-full shrink-0 overflow-hidden"
          src={
            user.user_metadata.picture ?? user.picture ?? DEFAULT_PROFILE_IMAGE
          }
          alt="Profile"
          width={40}
          height={40}
        />
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li>
            <Link
              href={PROFILE_ROUTE}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserRound className="w-4 h-4" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link
              href={USER_EXERCISES_ROUTE}
              className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <BookmarkIcon className="w-4 h-4" />
              <span>Your Exercises</span>
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
