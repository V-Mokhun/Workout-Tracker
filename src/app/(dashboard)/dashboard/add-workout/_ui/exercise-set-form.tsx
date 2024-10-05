import { BasicWorkoutExerciseSet } from "@/db";
import { cn } from "@/shared/lib";
import { Button, TableCell, TableRow } from "@/shared/ui";
import { DraggableProvided } from "@hello-pangea/dnd";
import { GripIcon, TrashIcon } from "lucide-react";

interface ExerciseSetFormProps {
  provided: DraggableProvided;
  isDragging: boolean;
  set: BasicWorkoutExerciseSet;
  index: number;
  onDelete: () => void;
}

export const ExerciseSetForm = ({
  provided,
  isDragging,
  set,
  index,
  onDelete,
}: ExerciseSetFormProps) => {
  return (
    <TableRow
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={cn(isDragging && "bg-slate-200")}
    >
      <TableCell className="w-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          {...provided.dragHandleProps}
        >
          <GripIcon className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{set.reps}</TableCell>
      <TableCell>{set.weightMetric}kg</TableCell>
      <TableCell>{set.rpe}</TableCell>
      <TableCell>{set.duration}</TableCell>
      <TableCell className="w-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onDelete}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};
