import { DEFAULT_EXERCISE_IMAGE, SINGLE_EXERCISE_ROUTE } from "@/shared/consts";
import { Button } from "@/shared/ui";
import { SearchExercise } from "@/widgets";
import { EditIcon, GripIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ExerciseCardProps<T extends SearchExercise> {
  exercise: T;
  index: number;
  onDelete: () => void;
}

export const ExerciseCard = <T extends SearchExercise>({
  exercise,
  index,
  onDelete,
}: ExerciseCardProps<T>) => {
  return (
    <div className="flex items-center gap-2 mb-1">
      <Button variant="ghost" size="icon">
        <GripIcon className="w-6 h-6" />
      </Button>
      <div className="flex justify-between items-center gap-4 flex-1">
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground text-2xl h-10 w-5 flex items-center justify-center">
            {index + 1}
          </span>
          <Link
            href={SINGLE_EXERCISE_ROUTE(exercise.slug)}
            className="flex items-center gap-3"
          >
            <Image
              width={96}
              height={70}
              alt={exercise.name}
              src={exercise.image ?? DEFAULT_EXERCISE_IMAGE}
              className="h-auto w-24 max-h-16 object-cover rounded-md"
            />
            <div className="space-y-0.5">
              <h3 className="text-base md:text-lg leading-tight font-semibold">
                {exercise.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {exercise?.targetMuscle?.name}
              </p>
            </div>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Button type="button" variant="ghost" size="icon">
            <EditIcon className="w-6 h-6" />
          </Button>
          <Button type="button" onClick={onDelete} variant="ghost" size="icon">
            <TrashIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
