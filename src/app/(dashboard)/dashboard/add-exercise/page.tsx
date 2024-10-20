import { Container, Heading, Section, TooltipProvider } from "@/shared/ui";
import { notFound } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
import { AddExerciseForm } from "./_ui";

export default async function Page() {
  const session = await getSession();

  if (!session) notFound();

  const userId = session.user.sub;

  return (
    <Section>
      <Container>
        <Heading className="mb-8" tag="h1" as="h2">
          Add Your Exercise
        </Heading>
        <AddExerciseForm userId={userId} />
      </Container>
    </Section>
  );
}
/*

Image   |   Name   
        |   Target Muscle
        |   Type
        |   Equipment
        |   Mechanics
        |   Force Type
        |   Experience Level
        |   Secondary Muscles

Overview - WYSIWYG or markdown
Instructions - WYSIWYG
Tips - WYSIWYG
*/

