import { Container, Heading, Section, Separator } from "@/shared/ui";
import { AccountSidebar } from "./_ui";
import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE } from "@/shared/consts";
import { db, user as dbUser } from "@/db";
import { eq } from "drizzle-orm";

const Page = async () => {
  const session = await getSession();

  if (!session) return;

  // const user = await db.query.user.findFirst({
  //   where: eq(dbUser.id, session.user.sub),
  // });

  return (
    <Section>
      <Container>
        <Heading className="mb-6 md:mb-8" tag="h1">
          Settings
        </Heading>
        <div className="grid gap-4 grid-cols-12">
          <AccountSidebar />
          <div className="col-span-6">
            <Heading className="mb-6">Profile</Heading>
          </div>
          <div className="col-span-3 flex flex-col items-center">
            <Image
              className="rounded-full object-cover"
              alt="Your avatar"
              src={session.user?.picture ?? DEFAULT_PROFILE_IMAGE}
              width={128}
              height={128}
            />
            <Separator className="my-2" />
            <div className="flex flex-col gap-1 items-center">
              <span className="text-xl md:text-2xl text-primary">4</span>
              <span className="md:text-lg">Workouts Completed</span>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Page;
