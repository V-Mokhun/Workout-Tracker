import { db, exerciseTargetMuscle } from "@/db";
import { DASHBOARD_ROUTE, EXERCISES_ROUTE } from "@/shared/consts";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Container,
  Section,
} from "@/shared/ui";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { slug: string } }) => {
  const muscleSlug = params.slug;

  const muscleGroup = await db.query.exerciseTargetMuscle.findFirst({
    where: eq(exerciseTargetMuscle.slug, muscleSlug),
  });

  if (!muscleGroup) {
    notFound();
  }

  return (
    <Section>
      <Container>
        <Breadcrumb>
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
              <BreadcrumbPage></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Container>
    </Section>
  );
};

export default Page;
