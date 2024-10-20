export const HOME_ROUTE = "/";

export const DASHBOARD_ROUTE = "/dashboard";
const createRoute = (route: string) => `${DASHBOARD_ROUTE}/${route}`;

export const PROFILE_ROUTE = createRoute("account");
export const PROFILE_DISPLAY_ROUTE = createRoute("account/display");

export const ADD_EXERCISE_ROUTE = createRoute("add-exercise");
export const USER_EXERCISES_ROUTE = createRoute("user-exercises");

export const EXERCISES_ROUTE = createRoute("exercises");
export const SINGLE_EXERCISE_ROUTE = (slug: string) =>
  createRoute(`exercise/${slug}`);

export const ADD_WORKOUT_ROUTE = createRoute("add-workout");
export const WORKOUT_ROUTE = (workoutId: string | number) =>
  createRoute(`workout/${workoutId}`);
