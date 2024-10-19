import { Container, Heading, Section } from "@/shared/ui";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound } from "next/navigation";
import { MonthlyWorkoutView } from "./_ui";

const Dashboard = async () => {
  const session = await getSession();

  if (!session) {
    notFound();
  }

  return (
    <Section className="pt-4">
      <Container>
        <Heading tag="h1" as="h2" className="mb-6">
          Welcome, {session.user.name}
        </Heading>
        <MonthlyWorkoutView />
      </Container>
    </Section>
  );
};

export default Dashboard;
