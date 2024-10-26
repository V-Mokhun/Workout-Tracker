import { user } from "@/db";
import {
  DASHBOARD_ROUTE,
  DEFAULT_PROFILE_IMAGE,
  HOME_ROUTE,
} from "@/shared/consts";
import { Container, Heading, Section } from "@/shared/ui";
import { getSession, updateSession } from "@auth0/nextjs-auth0";
import { eq, sql } from "drizzle-orm";
import { redirect } from "next/navigation";
import { db } from "@/db/database";

const Page = async () => {
  const session = await getSession();
  if (!session) redirect(HOME_ROUTE);

  const userId = session.user.sub ?? session.user.user_id;
  const userPicture =
    session.user?.user_metadata?.picture ??
    session.user?.picture ??
    DEFAULT_PROFILE_IMAGE;
  const userName =
    session.user?.user_metadata?.name ??
    session.user.name ??
    session.user.nickname ??
    session.user.username ??
    "Unknown";

  const result = await db.execute<{ exists: boolean }>(
    sql`select exists(${db
      .select({ n: sql`1` })
      .from(user)
      .where(eq(user.id, userId))}) as exists`
  );
  const exists = result.rows[0].exists;

  if (!exists) {
    await db.insert(user).values({
      id: userId,
      email: session.user.email,
      name: userName,
      avatar: userPicture,
    });

    await updateSession({
      ...session,
      user: {
        ...session.user,
        user_metadata: {
          picture: userPicture,
          name: userName,
          units: "metric",
        },
      },
    });
  }

  redirect(DASHBOARD_ROUTE);

  return (
    <Section>
      <Container>
        <Heading>Loading...</Heading>
      </Container>
    </Section>
  );
};

export default Page;
