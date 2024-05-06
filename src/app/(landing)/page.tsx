import { DASHBOARD_ROUTE } from "@/shared/consts";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  if (session) redirect(DASHBOARD_ROUTE);

  return (
    <main className="flex items-center gap-4">
      Landing page
      <a href="/api/auth/login">Login</a>
    </main>
  );
};

export default Home;
