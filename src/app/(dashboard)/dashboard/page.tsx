import { Container, Heading, Section } from "@/shared/ui";
import { MonthlyWorkoutView } from "./_ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { workoutService } from "@/shared/api";

const Dashboard = async () => {
  const session = await getSession();

  if (!session) {
    notFound();
  }

  const userMonthlyWorkouts = await workoutService.getMonthlyWorkouts(
    session.user.sub
  );

  return (
    <Section className="pt-4">
      <Container>
        <Heading tag="h1" as="h2" className="mb-6">
          Welcome
        </Heading>
        <MonthlyWorkoutView />
      </Container>
    </Section>
  );
};

export default Dashboard;
