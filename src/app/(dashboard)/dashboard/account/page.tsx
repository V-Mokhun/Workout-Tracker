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
    <div className="grid gap-8 md:grid-cols-3 animate-fadeIn">
      <div className="md:col-span-2 order-2 md:order-1">
        <Heading className="mb-6">Profile Information</Heading>
        <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg">
          <p className="text-gray-600 mb-6">
            Update your personal information.
          </p>
          <AccountForm user={user} />
        </div>
      </div>
      <div className="md:col-span-1 order-1 md:order-2 flex flex-col items-center">
        <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg w-full">
          <AccountImageUpload
            avatar={user.avatar ?? DEFAULT_PROFILE_IMAGE}
            userId={user.id}
          />
          {user.email && (
            <>
              <Separator className="mt-4 mb-2 w-full" />
              <span className="block max-w-full text-center break-words text-gray-600">
                {user.email}
              </span>
            </>
          )}
          <Separator className="my-2 w-full" />
          <div className="flex flex-col gap-1 items-center">
            <span className="text-lg md:text-xl text-primary">
              {workoutsCompleted}
            </span>
            <span className="text-gray-600">Workouts Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
