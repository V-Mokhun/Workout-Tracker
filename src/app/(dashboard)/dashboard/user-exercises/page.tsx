import { db } from "@/db/database";
import { Container, Heading, Section } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { UserExerciseContent } from "./_ui";

export default async function Page() {
  const session = await getSession();

  if (!session) notFound();

  const muscleGroups = await db.query.exerciseTargetMuscle.findMany();
  const equipments = await db.query.exerciseEquipment.findMany();

  return (
    <Section className="h-full">
      <Container className="h-full flex flex-col">
        <Heading className="mb-2" tag="h1">
          Your Exercises
        </Heading>
        <p className="text-lg md:mb-8 mb-10">
          A list of both your favourite and custom exercises.
        </p>
        <UserExerciseContent
          muscleGroups={muscleGroups}
          equipments={equipments}
        />
      </Container>
    </Section>
  );
}
