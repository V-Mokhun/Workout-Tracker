import { user as dbUser, workout as dbWorkout } from "@/db";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/consts";
import { Container, Heading, Section, Separator } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { count, eq } from "drizzle-orm";
import Image from "next/image";
import { AccountForm, AccountSidebar } from "./_ui";
import { db } from "@/db/database";

const Page = async () => {
  const session = await getSession();

  if (!session) return;

  const user = await db.query.user.findFirst({
    where: eq(dbUser.id, session.user.sub),
  });

  if (!user) return;

  const [{ count: workoutsCompleted }] = await db
    .select({ count: count() })
    .from(dbWorkout)
    .where(eq(dbWorkout.userId, session.user.sub));

  return (
    <Section>
      <Container>
        <Heading className="mb-6 md:mb-8" tag="h1">
          Settings
        </Heading>
        <div className="grid gap-5 grid-cols-12">
          <AccountSidebar />
          <div className="col-span-6">
            <Heading className="mb-6">Profile</Heading>
            <AccountForm user={user} />
          </div>
          <div className="col-span-3 flex flex-col items-center">
            <Image
              className="rounded-full object-cover"
              alt="Your avatar"
              src={user.avatar ?? DEFAULT_PROFILE_IMAGE}
              width={128}
              height={128}
            />
            {user.email && (
              <>
                <Separator className="my-2" />
                <div className="flex flex-col gap-1 items-center">
                  <span className="md:text-lg">{user.email}</span>
                </div>
              </>
            )}
            <Separator className="my-2" />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xl md:text-2xl text-primary">
                {workoutsCompleted}
              </span>
              <span className="md:text-lg">Workouts Completed</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Page;
