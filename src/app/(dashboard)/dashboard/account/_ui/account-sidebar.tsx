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
    <aside className="col-span-3">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              href={PROFILE_ROUTE}
              className={linkVariants({
                className: cn(
                  "p-2 text-foreground hover:text-primary-hover",
                  pathname === PROFILE_ROUTE
                    ? "font-medium relative after:block after:absolute after:h-full after:w-0.5 after:-left-1 after:bg-primary after:rounded-md"
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
                  "p-2 text-foreground hover:text-primary-hover",
                  pathname === PROFILE_DISPLAY_ROUTE
                    ? "font-medium relative after:block after:absolute after:h-full after:w-0.5 after:-left-1 after:bg-primary after:rounded-md"
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
