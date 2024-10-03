import { ADD_WORKOUT_ROUTE } from "@/shared/consts";
import { buttonVariants, Container, Heading, Section } from "@/shared/ui";
import Link from "next/link";

export default function Page() {
  return (
    <Section>
      <Container>
        <div className="flex items-center gap-4 justify-between">
          <Heading className="mb-2" tag="h1">
            Your Workouts
          </Heading>
          <Link href={ADD_WORKOUT_ROUTE} className={buttonVariants({})}>
            Add Workout
          </Link>
        </div>
      </Container>
    </Section>
  );
}
