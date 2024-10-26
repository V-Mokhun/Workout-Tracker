import {
  ADD_WORKOUT_ROUTE,
  DASHBOARD_ROUTE,
  EXERCISES_ROUTE,
} from "@/shared/consts";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { HeaderProfile } from "./header-profile";
import { Container, linkVariants, Button, buttonVariants } from "@/shared/ui";
import { AuthUser } from "@/shared/api";
import { Dumbbell } from "lucide-react";

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
          <div className="flex items-center gap-4">
            <Link
              className={buttonVariants({ variant: "ghost", size: "icon" })}
              title="New Workout"
              href={ADD_WORKOUT_ROUTE}
            >
              <Dumbbell className="h-6 w-6" />
              <span className="sr-only">New Workout</span>
            </Link>
            <HeaderProfile user={session.user as AuthUser} />
          </div>
        </div>
      </Container>
    </header>
  );
};
