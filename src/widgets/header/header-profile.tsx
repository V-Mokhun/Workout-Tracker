"use client";

import { Button, Dialog, Popover } from "@/shared/ui";
import { Button as UnstyledButton } from "react-aria-components";
import Image from "next/image";
import { DialogTrigger } from "react-aria-components";

interface HeaderProfileProps {
  user: any;
}

export const HeaderProfile = ({ user }: HeaderProfileProps) => {
  return (
    <DialogTrigger>
      <UnstyledButton>
        <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            className="h-full w-full aspect-square"
            src={user.picture}
            alt="Profile"
            width={40}
            height={40}
          />
        </div>
      </UnstyledButton>
      <Popover>
        <Dialog>
          <div>
            <span>33333</span>
            <span>33333</span>
            <span>33333</span>
            <span>33333</span>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
};
