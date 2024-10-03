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
    equipment: { name: string; slug: string };
  };
}

export const ExerciseDetails = ({ exercise }: ExerciseDetailsProps) => {
  return (
    <div className="bg-muted shadow-sm rounded-md p-2 md:py-4">
      <Heading tag="h3" className="mb-2 pl-2 md:pl-4">
        Exercise Details
      </Heading>
      <Table className="xs:text-base lg:text-lg">
        <TableBody>
          <TableRow>
            <TableCell className="md:w-1/3">Target Muscle</TableCell>
            <TableCell>
              <Link
                href={`${EXERCISES_ROUTE}/muscles/${exercise.targetMuscle.slug}`}
                className={linkVariants({
                  className:
                    "text-sm xs:text-base lg:text-lg underline hover:no-underline",
                })}
              >
                {exercise.targetMuscle.name}
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="md:w-1/3">Type</TableCell>
            <TableCell>{exercise.type.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="md:w-1/3">Equipment Required</TableCell>
            <TableCell>
              <Link
                href={`${EXERCISES_ROUTE}/equipments/${exercise.equipment.slug}`}
                className={linkVariants({
                  className:
                    "text-sm xs:text-base lg:text-lg underline hover:no-underline",
                })}
              >
                {exercise.equipment.name}
              </Link>
            </TableCell>
          </TableRow>
          {exercise.mechanics && (
            <TableRow>
              <TableCell className="md:w-1/3">Mechanics</TableCell>
              <TableCell>{exercise.mechanics}</TableCell>
            </TableRow>
          )}
          {exercise.forceType && (
            <TableRow>
              <TableCell className="md:w-1/3">Force Type</TableCell>
              <TableCell>{exercise.forceType}</TableCell>
            </TableRow>
          )}
          {exercise.experienceLevel && (
            <TableRow>
              <TableCell className="md:w-1/3">Experience Level</TableCell>
              <TableCell>{exercise.experienceLevel}</TableCell>
            </TableRow>
          )}
          {exercise.secondaryMuscles && (
            <TableRow>
              <TableCell className="md:w-1/3">Secondary Muscles</TableCell>
              <TableCell>{exercise.secondaryMuscles}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
