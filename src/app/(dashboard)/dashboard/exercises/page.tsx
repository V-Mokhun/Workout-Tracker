import { db } from "@/db";
import { BEST_EXERCISES, EXERCISES_ROUTE } from "@/shared/consts";
import { Container, Heading, Section, Separator } from "@/shared/ui";
import { ExerciseCard, ExercisesSearch } from "@/widgets";
import { ExerciseCategoryCard } from "./_ui";

const Page = async () => {
  const muscleGroups = await db.query.exerciseTargetMuscle.findMany();
  const equipments = await db.query.exerciseEquipment.findMany();

  return (
    <Section>
      <Container>
        <Heading className="mb-2" tag="h1">
          Find Exercises
        </Heading>
        <p className="text-lg md:mb-6 mb-8">
          Look for exercises to create your dream workout plan for strength and
          muscle building.
        </p>
        <ExercisesSearch />
        <p className="text-base xs:text-lg md:text-xl text-muted-foreground my-6 md:my-8">
          Don&apos;t know what you&apos;re looking for? Check out our
          categorised exercises below.
        </p>
        <div className="my-10 space-y-8">
          <div>
            <Heading className="mb-2 text-center">By Muscle Groups</Heading>
            <p className="text-muted-foreground text-center md:text-lg mb-6 md:mb-8 ">
              Target specific muscle groups with these exercises.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {muscleGroups.map((muscleGroup) => (
                <ExerciseCategoryCard
                  key={muscleGroup.id}
                  data={muscleGroup}
                  route={`${EXERCISES_ROUTE}/muscles/${muscleGroup.slug}`}
                />
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <Heading className="text-center mb-2">Most Popular</Heading>
            <p className="text-muted-foreground text-center md:text-lg mb-6 md:mb-8 ">
              Check out the most popular exercises.
            </p>
            <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
              {BEST_EXERCISES.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </ul>
          </div>
          <Separator />
          <div>
            <Heading className="text-center mb-2">By Equipment</Heading>
            <p className="text-muted-foreground text-center md:text-lg mb-6 md:mb-8 ">
              Find exercises based on the equipment you have.
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {equipments.map((equipment) => (
                <ExerciseCategoryCard
                  key={equipment.id}
                  data={equipment}
                  route={`${EXERCISES_ROUTE}/equipments/${equipment.slug}`}
                />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Page;
