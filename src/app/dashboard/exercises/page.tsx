import { db } from "@/db";
import { Container, Heading, Section } from "@/shared/ui";
import { ExercisesSearch } from "@/widgets";
import { ExerciseCategoryCard } from "./_ui";
import { EXERCISES_ROUTE } from "@/shared/consts";

const Page = async () => {
  const muscleGroups = await db.query.exerciseTargetMuscle.findMany();

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
        <ExercisesSearch />
        <p className="text-lg text-muted-foreground my-8">
          Don&apos;t know what you&apos;re looking for? Check out out
          categorised exercises below.
        </p>
        <div className="my-10 space-y-8">
          <div>
            <Heading className="mb-8">By Muscle Groups</Heading>
            <ul className="grid grid-cols-4 gap-4">
              {muscleGroups.map((muscleGroup) => (
                <ExerciseCategoryCard
                  key={muscleGroup.id}
                  data={muscleGroup}
                  route={`${EXERCISES_ROUTE}/muscles/${muscleGroup.slug}`}
                />
              ))}
            </ul>
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
