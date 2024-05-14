import { db, exercise, exerciseTargetMuscle } from "@/db";
import {
  DASHBOARD_ROUTE,
  DEFAULT_EXERCISE_LIMIT,
  EXERCISES_ROUTE,
} from "@/shared/consts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Container,
  Heading,
  Section,
} from "@/shared/ui";
import { ExerciseCard, ExercisesSearch } from "@/widgets";
import { and, eq, ilike } from "drizzle-orm";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: { slug: string; page?: string };
}) => {
  const muscleSlug = params.slug;

  const muscleGroup = await db.query.exerciseTargetMuscle.findFirst({
    where: eq(exerciseTargetMuscle.slug, muscleSlug),
  });

  if (!muscleGroup) {
    notFound();
  }

  const page = params.page ? parseInt(params.page, 10) : 1;
  if (page < 1 || isNaN(page)) {
    notFound();
  }

  const exercises = await db.query.exercise.findMany({
    where: eq(exercise.targetMuscleId, muscleGroup.id),
    with: {
      targetMuscle: {
        columns: {
          name: true,
        },
      },
      equipment: {
        columns: {
          name: true,
        },
      },
      type: {
        columns: {
          name: true,
        },
      },
    },
    limit: DEFAULT_EXERCISE_LIMIT,
    offset: (page - 1) * DEFAULT_EXERCISE_LIMIT,
  });

  return (
    <>
      <Breadcrumb>
        <Container>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={DASHBOARD_ROUTE}>Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={EXERCISES_ROUTE}>Exercises</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{muscleGroup.name} Exercises</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Container>
      </Breadcrumb>
      <Section>
        <Container>
          <Heading className="mb-2" tag="h1">
            {muscleGroup.name} Exercises
          </Heading>
          <p className="text-lg mb-10">
            Find {muscleGroup.name} exercises to target this muscle in your
            workout
          </p>
          <ExercisesSearch
            whereOptions={{
              targetMuscleId: muscleGroup.id,
            }}
          />

          <div className="my-10">
            <Heading className="mb-6 md:mb-8">Browse All</Heading>
            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Page;
