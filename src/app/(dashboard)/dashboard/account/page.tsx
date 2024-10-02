import { user as dbUser, workout as dbWorkout } from "@/db";
import { db } from "@/db/database";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/consts";
import { Heading, Separator } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { AccountForm, AccountImageUpload } from "./_ui";

const Page = async () => {
  const session = await getSession();

  if (!session) notFound();

  const user = await db.query.user.findFirst({
    where: eq(dbUser.id, session.user.sub),
  });

  if (!user) notFound();

  const [{ count: workoutsCompleted }] = await db
    .select({ count: count() })
    .from(dbWorkout)
    .where(eq(dbWorkout.userId, session.user.sub));

  return (
    <>
      <div className="col-span-6">
        <Heading className="mb-6">Profile</Heading>
        <AccountForm user={user} />
      </div>
      <div className="col-span-3 flex flex-col items-center">
        <AccountImageUpload avatar={user.avatar ?? DEFAULT_PROFILE_IMAGE} />
        {user.email && (
          <>
            <Separator className="mt-4 mb-2" />
            <span className="block max-w-full text-center break-words">
              {user.email}
            </span>
          </>
        )}
        <Separator className="my-2" />
        <div className="flex flex-col gap-1 items-center">
          <span className="text-lg md:text-xl text-primary">
            {workoutsCompleted}
          </span>
          <span>Workouts Completed</span>
        </div>
      </div>
    </>
  );
};

export default Page;
