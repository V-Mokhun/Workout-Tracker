import { DASHBOARD_ROUTE } from "@/shared/consts";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { HeaderProfile } from "./header-profile";

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
            <ul>
              <li></li>
            </ul>
          </nav>
          <HeaderProfile user={session.user} />
        </div>
      </div>
    </header>
  );
};
