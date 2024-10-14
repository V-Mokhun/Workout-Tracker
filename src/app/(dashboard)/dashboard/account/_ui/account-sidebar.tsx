"use client";

import { PROFILE_DISPLAY_ROUTE, PROFILE_ROUTE } from "@/shared/consts";
import { cn } from "@/shared/lib";
import { linkVariants } from "@/shared/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AccountSidebarProps {}

export const AccountSidebar = ({}: AccountSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-auto">
      <nav>
        <ul className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-2">
          <li>
            <Link
              href={PROFILE_ROUTE}
              className={linkVariants({
                className: cn(
                  "p-2 text-foreground hover:text-primary-hover transition-colors duration-300",
                  pathname === PROFILE_ROUTE
                    ? "font-medium relative after:block after:absolute after:h-0.5 after:w-full md:after:h-full md:after:w-0.5 md:after:-left-1 after:bottom-0 after:bg-primary after:rounded-md after:transition-all after:duration-300"
                    : "font-normal"
                ),
              })}
            >
              Profile Information
            </Link>
          </li>
          <li>
            <Link
              href={PROFILE_DISPLAY_ROUTE}
              className={linkVariants({
                className: cn(
                  "p-2 text-foreground hover:text-primary-hover transition-colors duration-300",
                  pathname === PROFILE_DISPLAY_ROUTE
                    ? "font-medium relative after:block after:absolute after:h-0.5 after:w-full md:after:h-full md:after:w-0.5 md:after:-left-1 after:bottom-0 after:bg-primary after:rounded-md after:transition-all after:duration-300"
                    : "font-normal"
                ),
              })}
            >
              Display
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
