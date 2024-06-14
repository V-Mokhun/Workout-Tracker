import { DASHBOARD_ROUTE } from "@/shared/consts";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    returnTo: `${DASHBOARD_ROUTE}/logged-in`,
  }),
});
