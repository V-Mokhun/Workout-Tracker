import { Container, Heading, Section } from "@/shared/ui";
import { AddWorkoutForm } from "./_ui";

export default function Page() {
  return (
    <Section>
      <Container>
        <Heading className="mb-2" tag="h1">
          Add a Workout
        </Heading>
        <AddWorkoutForm />
          {/* 
            name (title)
            date
            description?
            duration? 
              - exercise
                - set
                - set
                ...
        */}
      </Container>
    </Section>
  );
}
