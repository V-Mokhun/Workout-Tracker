import { db } from "@/db/database";
import { customExercise } from "@/db/schema";
import { DASHBOARD_ROUTE, USER_EXERCISES_ROUTE } from "@/shared/consts";
import { EXERCISES_ROUTE } from "@/shared/consts";
import { Section } from "@/shared/ui";
import { Container } from "@/shared/ui";
import { Heading } from "@/shared/ui";
import { Breadcrumbs } from "@/widgets";
import { getSession } from "@auth0/nextjs-auth0";
import { eq } from "drizzle-orm";
import { and } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session) notFound();

  const userId = session.user.sub;
  const exerciseSlug = params.slug;

  const exercise = await db.query.customExercise.findFirst({
    where: and(
      eq(customExercise.userId, userId),
      eq(customExercise.slug, exerciseSlug)
    ),
  });

  if (!exercise) notFound();

  return (
    <>
      <Breadcrumbs
        pageName={exercise.name}
        routes={[
          {
            name: "Dashboard",
            href: DASHBOARD_ROUTE,
          },
          {
            name: "Your Exercises",
            href: USER_EXERCISES_ROUTE,
          },
        ]}
      />
      <Section className="pt-4">
        <Container>
          <Heading className="mb-4 md:mb-6" tag="h1">
            {exercise.name}
          </Heading>
        </Container>
      </Section>
    </>
  );
}
