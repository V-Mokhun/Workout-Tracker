import { Container, Heading, Section } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { AddExerciseForm } from "./_ui";

export default async function Page() {
  const session = await getSession();

  if (!session) notFound();

  const userId = session.user.sub;

  return (
    <Section>
      <Container>
        <Heading className="mb-8" tag="h1" as="h2">
          Add Exercise
        </Heading>
        <AddExerciseForm userId={userId} />
      </Container>
    </Section>
  );
}
