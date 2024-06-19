"use client";

import { AuthUser } from "@/shared/api";
import {
  DEFAULT_PROFILE_IMAGE,
  PERSONAL_EXERCISES_ROUTE,
  PROFILE_ROUTE,
} from "@/shared/consts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  ThemePicker,
} from "@/shared/ui";
import { Dumbbell, LogOut, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProfileProps {
  user: AuthUser;
}

export const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="aspect-square h-10 w-10 rounded-full shrink-0 overflow-hidden"
          src={user.user_metadata.picture ?? DEFAULT_PROFILE_IMAGE}
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
