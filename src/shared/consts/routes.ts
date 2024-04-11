export const HOME_ROUTE = "/";

export const DASHBOARD_ROUTE = "/dashboard";
const createRoute = (route: string) => `${DASHBOARD_ROUTE}/${route}`;

export const PROFILE_ROUTE = createRoute("profile");
export const PERSONAL_EXERCISES_ROUTE = createRoute("personal-exercises");
export const EXERCISES_ROUTE = createRoute("exercises");
