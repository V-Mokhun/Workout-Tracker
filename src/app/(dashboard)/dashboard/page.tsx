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

  const totalWorkouts = userMonthlyWorkouts.length;
  const totalDuration = userMonthlyWorkouts.reduce(
    (sum, workout) => sum + (workout.duration || 0),
    0
  );

  return (
    <Section className="pt-4">
      <Container>
        <Heading tag="h1" as="h2" className="mb-6">
          Welcome, {session.user.name}
        </Heading>
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <Heading tag="h2" as="h3" className="mb-2">
            This Month&apos;s Summary
          </Heading>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:text-lg">
            <p className="mb-2 sm:mb-0">
              <span className="font-medium">{totalWorkouts}</span> workout
              {totalWorkouts !== 1 ? "s" : ""}
            </p>
            <p>
              Total duration:{" "}
              <span className="font-medium">{totalDuration} minutes</span>
            </p>
          </div>
        </div>
        <MonthlyWorkoutView workouts={userMonthlyWorkouts} />
      </Container>
    </Section>
  );
};

export default Dashboard;
