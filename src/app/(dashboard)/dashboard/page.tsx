import { getSession } from "@auth0/nextjs-auth0";

const Dashboard = async () => {
  const session = await getSession();

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
