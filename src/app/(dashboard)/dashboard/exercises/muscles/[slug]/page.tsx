import { exercise, exerciseTargetMuscle, userExercise } from "@/db";
import {
  DASHBOARD_ROUTE,
  DEFAULT_EXERCISE_LIMIT,
  EXERCISES_ROUTE,
} from "@/shared/consts";
import { Container, Heading, Section } from "@/shared/ui";
import {
  Breadcrumbs,
  ExerciseCard,
  ExercisesSearch,
  Pagination,
} from "@/widgets";
import { count, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db/database";
import { getSession } from "@auth0/nextjs-auth0";

const Page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { page?: string };
}) => {
  const session = await getSession();
  const muscleSlug = params.slug;

  const muscleGroup = await db.query.exerciseTargetMuscle.findFirst({
    where: eq(exerciseTargetMuscle.slug, muscleSlug),
  });

  if (!muscleGroup) {
    notFound();
  }

  const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
  if (page < 1 || isNaN(page)) {
    notFound();
  }

  const exercises = await db.query.exercise.findMany({
    where: eq(exercise.targetMuscleSlug, muscleGroup.slug),
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
      userExercises: {
        where: eq(userExercise.userId, session?.user?.sub ?? ""),
        columns: {
          isFavorite: true,
        },
      },
    },
    limit: DEFAULT_EXERCISE_LIMIT,
    offset: (page - 1) * DEFAULT_EXERCISE_LIMIT,
  });
  const [totalExercises] = await db
    .select({ count: count() })
    .from(exercise)
    .where(eq(exercise.targetMuscleSlug, muscleGroup.slug));

  const totalPages = Math.ceil(totalExercises.count / DEFAULT_EXERCISE_LIMIT);

  return (
    <>
      <Breadcrumbs
        pageName={`${muscleGroup.name} Exercises`}
        routes={[
          {
            name: "Dashboard",
            href: DASHBOARD_ROUTE,
          },
          {
            name: "Exercises",
            href: EXERCISES_ROUTE,
          },
        ]}
      />
      <Section className="pt-4">
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
              targetMuscleSlug: muscleGroup.slug,
            }}
          />

          <div className="my-10">
            <Heading className="mb-6 md:mb-8">Browse All</Heading>
            <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
              {exercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={{
                    ...exercise,
                    userExercise: exercise.userExercises?.[0],
                  }}
                />
              ))}
            </ul>
          </div>
          <Pagination
            totalPages={totalPages}
            disablePrevious={page === 1}
            disableNext={page === totalPages}
            currentPage={page}
          />
        </Container>
      </Section>
    </>
  );
};

export default Page;
