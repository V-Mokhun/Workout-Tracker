export const BEST_EXERCISES = [
  {
    id: 1,
    name: "Dumbbell Bench Press",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/dumbbell-bench-press.jpg",
    slug: "dumbbell-bench-press",
    targetMuscle: { name: "Chest" },
    type: { name: "Strength" },
    equipment: { name: "Dumbbell" },
  },
  {
    id: 2,
    name: "Military Press (AKA Overhead Press)",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/military-press.jpg",
    slug: "military-press",
    targetMuscle: {
      name: "Shoulders",
    },
    type: { name: "Strength" },
    equipment: { name: "Barbell" },
  },
  {
    id: 3,
    name: "Lat Pull Down",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/lat-pull-down.jpg",
    slug: "lat-pull-down",
    targetMuscle: { name: "Lats" },
    type: { name: "Strength" },
    equipment: { name: "Cable" },
  },
  {
    id: 4,
    name: "Dumbbell Lateral Raise",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/dumbbell-lateral-raise.jpg",
    slug: "dumbbell-lateral-raise",
    targetMuscle: { name: "Shoulders" },
    type: { name: "Strength" },
    equipment: { name: "Dumbbell" },
  },
  {
    id: 5,
    name: "Bent Over Row",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/bent-over-barbell-row.jpg",
    slug: "bent-over-barbell-row",
    targetMuscle: { name: "Upper Back" },
    type: { name: "Strength" },
    equipment: { name: "Barbell" },
  },
  {
    id: 6,
    name: "Dumbbell Pullover",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/dumbbell-pullover.jpg",
    slug: "dumbbell-pullover",
    targetMuscle: { name: "Chest" },
    type: { name: "Strength" },
    equipment: { name: "Dumbbell" },
  },
  {
    id: 7,
    name: "Barbell Back Squat",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/squat.jpg",
    slug: "squat",
    targetMuscle: { name: "Quads" },
    type: { name: "Strength" },
    equipment: { name: "Barbell" },
  },
  {
    id: 8,
    name: "Conventional Deadlift",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/deadlifts.jpg",
    slug: "deadlifts",
    targetMuscle: { name: "Hamstrings" },
    type: { name: "Strength" },
    equipment: { name: "Barbell" },
  },
  {
    id: 9,
    name: "Incline Bench Press",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/incline-bench-press.jpg",
    slug: "incline-bench-press",
    targetMuscle: { name: "Chest" },
    type: { name: "Strength" },
    equipment: { name: "Barbell" },
  },
  {
    id: 10,
    name: "Chest Dip",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/chest-dip.jpg",
    slug: "chest-dip",
    targetMuscle: { name: "Chest" },
    type: { name: "Strength" },
    equipment: { name: "Bodyweight" },
  },
  {
    id: 11,
    name: "Pull Up",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/pull-up.jpg",
    slug: "pull-up",
    targetMuscle: { name: "Lats" },
    type: { name: "Strength" },
    equipment: { name: "Bodyweight" },
  },
  {
    id: 12,
    name: "Plank",
    image:
      "https://res.cloudinary.com/dci425ss5/image/upload/exercises/plank.jpg",
    slug: "plank",
    targetMuscle: { name: "Abs" },
    type: { name: "Strength" },
    equipment: { name: "Bodyweight" },
  },
];

export const EXERCISE_EXPERIENCES = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const EXERCISE_MUSCLE_GROUPS = [
  "Abductors",
  "Abs",
  "Adductors",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Hip Flexors",
  "IT Band",
  "Lats",
  "Lower Back",
  "Middle Back",
  "Neck",
  "Obliques",
  "Quads",
  "Shoulders",
  "Traps",
  "Triceps",
] as const;

export const EXERCISE_EQUIPMENTS = [
  "Dumbbell",
  "Barbell",
  "Cable",
  "Machine",
  "Bodyweight",
  "Other",
  "Trap Bar",
  "Landmine",
  "Kettle Bells",
  "Chains",
  "Bench",
  "Bands",
  "Medicine Ball",
  "Box",
  "Sled",
  "Exercise Ball",
  "Rings",
  "Safety Bar",
  "Jump Rope",
  "Rope",
  "EZ Bar",
  "Fat Bar",
  "Valslide",
  "Tire",
  "Hip Thruster",
  "Lacrosse Ball",
  "Tiger Tail",
  "Foam Roll",
] as const;

export const EXERCISE_TYPES = [
  "Strength",
  "Warmup",
  "Plyometrics",
  "Activation",
  "Olympic Weightlifting",
  "Powerlifting",
  "Conditioning",
  "SMR",
  "Strongman",
  "Stretching",
] as const;

export const EXERCISE_MECHANICS = ["Compound", "Isolation"] as const;
