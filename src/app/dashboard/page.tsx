import { getSession } from "@auth0/nextjs-auth0";

const Dashboard = async () => {
  const session = await getSession();

  return (
    <main>
      Dashboard
      <p>{JSON.stringify(session?.user, null, 2)}</p>
      <a href="/api/auth/logout">Logout</a>
    </main>
  );
};

export default Dashboard;
