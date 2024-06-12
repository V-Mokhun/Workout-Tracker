import { Exercise, FullExercise } from "@/db";
import { EXERCISES_ROUTE } from "@/shared/consts";
import {
  Heading,
  Table,
  TableBody,
  TableCell,
  TableRow,
  linkVariants,
} from "@/shared/ui";
import Link from "next/link";

interface ExerciseDetailsProps {
  exercise: Exercise & {
    targetMuscle: { name: string; slug: string };
    type: { name: string };
    equipment: { name: string };
  };
}

export const ExerciseDetails = ({ exercise }: ExerciseDetailsProps) => {
  return (
    <div className="bg-muted shadow-sm rounded-md py-4 px-2">
      <Heading tag="h3" className="mb-2 pl-4">
        Exercise Details
      </Heading>
      <Table className="text-lg">
        <TableBody>
          <TableRow>
            <TableCell className="w-1/3">Target Muscle</TableCell>
            <TableCell>
              <Link
                href={`${EXERCISES_ROUTE}/muscles/${exercise.targetMuscle.slug}`}
                className={linkVariants({ className: "text-lg" })}
              >
                {exercise.targetMuscle.name}
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3">Type</TableCell>
            <TableCell>{exercise.type.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3">Equipment Required</TableCell>
            <TableCell>{exercise.equipment.name}</TableCell>
          </TableRow>
          {exercise.mechanics && (
            <TableRow>
              <TableCell className="w-1/3">Mechanics</TableCell>
              <TableCell>{exercise.mechanics}</TableCell>
            </TableRow>
          )}
          {exercise.forceType && (
            <TableRow>
              <TableCell className="w-1/3">Force Type</TableCell>
              <TableCell>{exercise.forceType}</TableCell>
            </TableRow>
          )}
          {exercise.experienceLevel && (
            <TableRow>
              <TableCell className="w-1/3">Experience Level</TableCell>
              <TableCell>{exercise.experienceLevel}</TableCell>
            </TableRow>
          )}
          {exercise.secondaryMuscles && (
            <TableRow>
              <TableCell className="w-1/3">Secondary Muscles</TableCell>
              <TableCell>{exercise.secondaryMuscles}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
