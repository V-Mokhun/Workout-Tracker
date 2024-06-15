import { exercise as dbExercise } from "@/db";
import {
  DASHBOARD_ROUTE,
  DEFAULT_EXERCISE_IMAGE,
  EXERCISES_ROUTE,
} from "@/shared/consts";
import { Container, Heading, Section } from "@/shared/ui";
import { Breadcrumbs } from "@/widgets";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExerciseDetails } from "./_ui";
import { db } from "@/db/database";

const Page = async ({ params }: { params: { slug: string } }) => {
  const exerciseSlug = params.slug;
  const exercise = await db.query.exercise.findFirst({
    where: eq(dbExercise.slug, exerciseSlug),
    with: {
      targetMuscle: {
        columns: {
          name: true,
          slug: true,
          fullImage: true,
        },
      },
      equipment: {
        columns: {
          name: true,
          slug: true,
        },
      },
      type: {
        columns: {
          name: true,
        },
      },
    },
  });

  if (!exercise) {
    notFound();
  }

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
            name: "Exercises",
            href: EXERCISES_ROUTE,
          },
        ]}
      />
      <Section className="pt-4">
        <Container>
          <Heading className="mb-4 md:mb-6" tag="h1">
            {exercise.name}
          </Heading>
          <div className="flex gap-2 mb-8">
            <Image
              className="hidden lg:block"
              alt={`Target Muscle: ${exercise.targetMuscle.name}`}
              src={exercise.targetMuscle.fullImage}
              width={300}
              height={600}
              priority
            />
            <Image
              className="flex-1 w-full h-auto object-cover"
              alt={`${exercise.name} Exercise`}
              src={exercise.image ?? DEFAULT_EXERCISE_IMAGE}
              width={800}
              height={500}
              priority
            />
          </div>
          <div className="space-y-6 content md:text-lg">
            <ExerciseDetails exercise={exercise} />
            {exercise.overview && (
              <div>
                <Heading className="mb-2">Overview</Heading>
                <div
                  className="space-y-2"
                  dangerouslySetInnerHTML={{ __html: exercise.overview }}
                />
              </div>
            )}
            {exercise.instructions && (
              <div>
                <Heading className="mb-2">Instructions</Heading>
                <div
                  className="space-y-2"
                  dangerouslySetInnerHTML={{ __html: exercise.instructions }}
                />
              </div>
            )}
            {exercise.tips && (
              <div>
                <Heading className="mb-2">Tips</Heading>
                <div
                  className="space-y-2"
                  dangerouslySetInnerHTML={{ __html: exercise.tips }}
                />
              </div>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default Page;
