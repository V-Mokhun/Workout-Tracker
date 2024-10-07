"use client";

import { BasicWorkoutExerciseSet, Units } from "@/db";
import { cn } from "@/shared/lib";
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  TableCell,
  TableRow,
} from "@/shared/ui";
import { DraggableProvided } from "@hello-pangea/dnd";
import { CopyIcon, GripIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

interface ExerciseSetFormProps {
  provided: DraggableProvided;
  isDragging: boolean;
  set: BasicWorkoutExerciseSet;
  index: number;
  onDelete: () => void;
  onUpdate: (set: BasicWorkoutExerciseSet) => void;
  onDuplicate: () => void;
  isError?: boolean;
  units: Units;
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
  units,
}: ExerciseSetFormProps) => {
  const [open, setOpen] = useState(false);

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
      <TableCell>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "h-8 w-8 font-bold hover:text-inherit",
                set.type === "Warmup" &&
                  "text-orange-500 hover:text-orange-500",
                set.type === "Failure" && "text-red-500 hover:text-red-500"
              )}
            >
              {!set.type || set.type === "Normal"
                ? index + 1
                : set.type.slice(0, 1)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-slate-700 text-white min-w-40">
            <ul className="text-sm space-y-1">
              <li>
                <Button
                  className={cn(
                    "w-full gap-2 justify-start px-2 py-1 font-semibold hover:bg-slate-500 hover:text-white",
                    set.type === "Normal" && "bg-slate-500"
                  )}
                  variant="ghost"
                  onClick={() => {
                    onFieldChange("type", "Normal");
                    setOpen(false);
                  }}
                >
                  <span className="text-green-400 font-bold inline-block w-4">
                    N
                  </span>
                  Normal
                </Button>
              </li>
              <li>
                <Button
                  className={cn(
                    "w-full gap-2 justify-start px-2 py-1 font-semibold hover:bg-slate-500 hover:text-white",
                    set.type === "Warmup" && "bg-slate-500"
                  )}
                  variant="ghost"
                  onClick={() => {
                    onFieldChange("type", "Warmup");
                    setOpen(false);
                  }}
                >
                  <span className="text-orange-400 font-bold inline-block w-4">
                    W
                  </span>
                  Warm-up
                </Button>
              </li>
              <li>
                <Button
                  className={cn(
                    "w-full gap-2 justify-start px-2 py-1 font-semibold hover:bg-slate-500 hover:text-white",
                    set.type === "Failure" && "bg-slate-500"
                  )}
                  variant="ghost"
                  onClick={() => {
                    onFieldChange("type", "Failure");
                    setOpen(false);
                  }}
                >
                  <span className="text-red-400 font-bold inline-block w-4">
                    F
                  </span>
                  Failure
                </Button>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </TableCell>
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
          value={
            units === "metric"
              ? set.weightMetric ?? ""
              : set.weightImperial ?? ""
          }
          onChange={(e) =>
            onFieldChange(
              units === "metric" ? "weightMetric" : "weightImperial",
              e.target.value
            )
          }
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
          type="button"
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
          type="button"
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
