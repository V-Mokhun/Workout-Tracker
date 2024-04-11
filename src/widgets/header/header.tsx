import { DASHBOARD_ROUTE, EXERCISES_ROUTE } from "@/shared/consts";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { HeaderProfile } from "./header-profile";
import { linkVariants } from "@/shared/ui";

interface HeaderProps {}

export const Header = async ({}: HeaderProps) => {
  const session = await getSession();

  if (!session) return null;

  return (
    <header className="py-4">
      <div className="container">
        <div className="flex justify-between items-center gap-4">
          <Link href={DASHBOARD_ROUTE}>LOGO</Link>
          <nav>
            <ul className="flex items-center gap-4">
              <li>
                <Link
                  href={DASHBOARD_ROUTE}
                  className={linkVariants({ size: "lg" })}
                >
                  Workouts
                </Link>
              </li>
              <li>
                <Link
                  href={EXERCISES_ROUTE}
                  className={linkVariants({ size: "lg" })}
                >
                  Exercises
                </Link>
              </li>
            </ul>
          </nav>
          <HeaderProfile user={session.user} />
        </div>
      </div>
    </header>
  );
};
