import { db, exercise } from "@/db";
import { Container, Heading, Section } from "@/shared/ui";
import { ExercisesSearch } from "@/widgets";
import { ilike } from "drizzle-orm";

const Page = async () => {
  // const muscleGroups = await db.query.exerciseTargetMuscle.findMany();
  // const card = {
  //   id: 19,
  //   name: "Traps",
  //   slug: "traps",
  //   image:
  //     "https://res.cloudinary.com/dci425ss5/image/upload/muscle-groups/traps.jpg",
  //   fullImage:
  //     "https://res.cloudinary.com/dci425ss5/image/upload/target-muscles/abductors.jpg",
  // };
  // const exercises = await db.query.exercise.findMany({
  //   limit: 1,
  //   with: { targetMuscle: { columns: { name: true } } },
  // });

  async function searchExercises(searchValue: string) {
    "use server";

    const exercises = await db.query.exercise.findMany({
      where: ilike(exercise.name, `%${searchValue}%`),
      columns: {
        id: true,
        name: true,
        slug: true,
        image: true,
      },
      with: {
        targetMuscle: {
          columns: {
            name: true,
          },
        },
      },
      limit: 5,
    });

    console.log(searchValue, exercises);

    return exercises;
  }

  return (
    <Section>
      <Container>
        <Heading className="mb-2" tag="h1">
          Find Exercises
        </Heading>
        <p className="mb-10">
          Look for exercises to create your dream workout plan for strength and
          muscle building.
        </p>
        <ExercisesSearch onSearch={searchExercises} />
        <div className="my-10 space-y-8">
          <div>
            <Heading>By Muscle Groups</Heading>
            <ul></ul>
          </div>
          <Heading>Most Popular</Heading>
          {/* Most popular exs (8 or 12) */}
          <Heading>By Equipment</Heading>
          {/* Equipment Categories */}
        </div>
      </Container>
    </Section>
  );
};

export default Page;
