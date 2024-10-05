import { BasicWorkoutExerciseSet } from "@/db";
import { cn } from "@/shared/lib";
import { Button, Input, TableCell, TableRow } from "@/shared/ui";
import { DraggableProvided } from "@hello-pangea/dnd";
import { CopyIcon, GripIcon, TrashIcon } from "lucide-react";

interface ExerciseSetFormProps {
  provided: DraggableProvided;
  isDragging: boolean;
  set: BasicWorkoutExerciseSet;
  index: number;
  onDelete: () => void;
  onUpdate: (set: BasicWorkoutExerciseSet) => void;
  onDuplicate: () => void;
  isError?: boolean;
}

export const ExerciseSetForm = ({
  provided,
  isDragging,
  set,
  index,
  onDelete,
  onUpdate,
  onDuplicate,
  isError,
}: ExerciseSetFormProps) => {
  const onFieldChange = (
    field: keyof BasicWorkoutExerciseSet,
    value: string
  ) => {
    onUpdate({ ...set, [field]: value });
  };

  return (
    <TableRow
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={cn(
        isDragging && "bg-slate-200",
        isError && "border-destructive"
      )}
    >
      <TableCell className="w-10">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <GripIcon className="h-4 w-4" />
        </Button>
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Input
          type="number"
          step={1}
          pattern="[0-9]*"
          value={set.reps ?? ""}
          onChange={(e) => onFieldChange("reps", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={set.weightMetric ?? ""}
          onChange={(e) => onFieldChange("weightMetric", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step={1}
          pattern="[0-9]*"
          value={set.rpe ?? ""}
          onChange={(e) => onFieldChange("rpe", e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          step={1}
          pattern="[0-9]*"
          value={set.duration ?? ""}
          onChange={(e) => onFieldChange("duration", e.target.value)}
        />
      </TableCell>
      <TableCell className="w-10">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onDuplicate}
        >
          <CopyIcon className="h-4 w-4" />
        </Button>
      </TableCell>
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
