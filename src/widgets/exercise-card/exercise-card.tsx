import { BasicExercise, UserExercise } from "@/db";
import { SINGLE_EXERCISE_ROUTE } from "@/shared/consts";
import { Heading, Separator } from "@/shared/ui";
import { Dumbbell, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "./favorite-button";

interface ExerciseCardProps {
  exercise: BasicExercise & {
    targetMuscle: { name: string };
    type: { name: string };
    equipment: { name: string };
    userExercises: Partial<UserExercise>[];
  };
}

export const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  return (
    <li
      className="flex flex-col bg-muted rounded-md shadow-sm h-full"
      key={exercise.id}
    >
      <Link
        href={SINGLE_EXERCISE_ROUTE(exercise.slug)}
        className="relative after:block after:inset-0 after:absolute after:rounded-t-md after:bg-transparent after:transition-colors hover:after:bg-black/20"
      >
        <Image
          className="w-full h-auto object-cover rounded-t-md"
          width={480}
          height={300}
          src={exercise.image!}
          alt={exercise.name}
        />
      </Link>
      <div className="py-2 flex flex-col h-full">
        <div className="px-2 md:px-4 flex-auto flex items-start justify-between gap-2">
          <Link href={SINGLE_EXERCISE_ROUTE(exercise.slug)}>
            <Heading
              tag="h4"
              className="transition-colors hover:text-primary mb-0.5"
            >
              {exercise.name}
            </Heading>
            <span className="text-muted-foreground">
              {exercise.targetMuscle.name}
            </span>
          </Link>

          <FavoriteButton
            exerciseId={exercise.id}
            initialIsFavorite={exercise.userExercises[0]?.isFavorite ?? false}
          />
        </div>
        <Separator className="mt-3" />
        <div className="grid grid-cols-2 gap-2 text-sm md:text-base px-2 md:px-4">
          <div className="flex justify-center items-center gap-1.5 pr-2 py-2 border-r">
            <Target className="shrink-0 w-4 h-4" />
            <span>{exercise.type.name}</span>
          </div>
          <div className="flex justify-center items-center gap-1.5 py-2">
            <Dumbbell className="shrink-0 w-4 h-4" />
            <span>{exercise.equipment.name}</span>
          </div>
        </div>
      </div>
    </li>
  );
};
