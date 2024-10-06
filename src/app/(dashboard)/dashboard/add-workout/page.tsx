import { Container, Heading, Section } from "@/shared/ui";
import { AddWorkoutForm } from "./_ui";
import { notFound } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  if (!session) notFound();

  const units = session.user.user_metadata.units ?? "metric";
  const userId = session.user.sub;

  return (
    <Section>
      <Container>
        <Heading className="mb-2" tag="h1">
          Add a Workout
        </Heading>
        <AddWorkoutForm units={units} userId={userId} />
      </Container>
    </Section>
  );
}
