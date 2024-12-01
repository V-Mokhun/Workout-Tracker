import {
  ExerciseCard,
  ExerciseCardSkeleton,
  ExerciseCardType,
} from "@/widgets";

interface UserExerciseListProps {
  exercises: ExerciseCardType[];
  isLoading: boolean;
}

export const UserExerciseList = ({
  exercises,
  isLoading,
}: UserExerciseListProps) => {
  // if (isLoading) {
  //   return (
  //     <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 flex-1">
  //       {Array.from({ length: 6 }).map((_, index) => (
  //         <ExerciseCardSkeleton key={index} />
  //       ))}
  //     </ul>
  //   );
  // }

  if (exercises.length === 0) {
    return (
      <p className="text-center text-lg flex-1">No exercises found</p>
    );
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 flex-1">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={`${exercise.id}-${exercise.isCustom}`}
          exercise={exercise}
        />
      ))}
    </ul>
  );
};
