import { DASHBOARD_ROUTE, EXERCISES_ROUTE } from "@/shared/consts";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { HeaderProfile } from "./header-profile";
import { Container, linkVariants } from "@/shared/ui";
import { AuthUser } from "@/shared/api";

export const Header = async () => {
  const session = await getSession();

  if (!session) return null;

  return (
    <header className="py-4">
      <Container>
        <div className="flex justify-between items-center gap-4">
          <Link href={DASHBOARD_ROUTE}>LOGO</Link>
          <nav>
            <ul className="flex items-center gap-4">
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
          <HeaderProfile user={session.user as AuthUser} />
        </div>
      </Container>
    </header>
  );
};
