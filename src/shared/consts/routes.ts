export const HOME_ROUTE = "/";

export const DASHBOARD_ROUTE = "/dashboard";
const createRoute = (route: string) => `${DASHBOARD_ROUTE}/${route}`;

export const PROFILE_ROUTE = createRoute("account");
export const PROFILE_DISPLAY_ROUTE = createRoute("account/display");
export const PERSONAL_EXERCISES_ROUTE = createRoute("personal-exercises");
export const EXERCISES_ROUTE = createRoute("exercises");
export const SINGLE_EXERCISE_ROUTE = createRoute("exercise");
