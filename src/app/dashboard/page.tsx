import { getSession } from "@auth0/nextjs-auth0";

const Dashboard = async () => {
  const session = await getSession();

  return (
    <main>
      Dashboard
      <p>{JSON.stringify(session?.user, null, 2)}</p>
    </main>
  );
};

export default Dashboard;
