import { cn, reorder } from "@/shared/lib";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { ExerciseWithSets } from "./add-workout-form";
import { ExerciseSetForm } from "./exercise-set-form";
import { ExerciseCard } from "./exercise-card";
import { BasicWorkoutExerciseSet, Units } from "@/db";
import { AddWorkoutFormSchema } from "./add-workout-model";
import { FieldErrors } from "react-hook-form";

interface AddWorkoutExercisesProps {
  exercises: ExerciseWithSets[];
  setExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
  units: Units;
  errors: FieldErrors<AddWorkoutFormSchema>["exercises"];
  disabled: boolean;
}

export const AddWorkoutExercises = ({
  exercises,
  setExercises,
  units,
  errors,
  disabled,
}: AddWorkoutExercisesProps) => {
  const onExerciseDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.type === "exercise-set") {
      const sourceExercise = exercises.find(
        (ex) => ex.instanceId === result.source.droppableId
      );
      if (!sourceExercise) return;

      const isDroppedOnSameExercise =
        result.source.droppableId === result.destination.droppableId;

      if (isDroppedOnSameExercise) {
        const updatedSets = reorder(
          sourceExercise.sets,
          result.source.index,
          result.destination.index
        );

        setExercises((prevExercises) =>
          prevExercises.map((ex) =>
            ex.instanceId === sourceExercise.instanceId
              ? { ...ex, sets: updatedSets }
              : ex
          )
        );
      } else {
        const destinationExercise = exercises.find(
          (ex) => ex.instanceId === result.destination?.droppableId
        );
        if (!destinationExercise) return;

        const movedSet = sourceExercise.sets[result.source.index];

        const updatedSourceExercise = {
          ...sourceExercise,
          sets: sourceExercise.sets.filter(
            (_, index) => index !== result.source.index
          ),
        };

        const updatedDestinationSets = [
          ...destinationExercise.sets.slice(0, result.destination.index),
          movedSet,
          ...destinationExercise.sets.slice(result.destination.index),
        ];

        setExercises((prevExercises) =>
          prevExercises.map((ex) => {
            if (ex.instanceId === sourceExercise.instanceId) {
              return updatedSourceExercise;
            } else if (ex.instanceId === destinationExercise.instanceId) {
              return {
                ...destinationExercise,
                sets: updatedDestinationSets,
              };
            }

            return ex;
          })
        );
      }

      return;
    }

    const items = reorder(
      exercises,
      result.source.index,
      result.destination.index
    );

    setExercises(items);
  };

  const onDeleteExercise = (instanceId: string) => {
    setExercises((prevExercises) =>
      prevExercises.filter((ex) => ex.instanceId !== instanceId)
    );
  };

  const onDeleteSet = (instanceId: string, setId: number) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.instanceId === instanceId
          ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
          : ex
      )
    );
  };

  const onAddSet = (instanceId: string, position: number) => {
    setExercises((prevExercises) => {
      const newSetId =
        prevExercises.reduce((acc, ex) => {
          return Math.max(acc, ...ex.sets.map((s) => s.id));
        }, 0) + 1;

      const newSet = {
        id: newSetId,
        duration: null,
        reps: null,
        rpe: null,
        weightMetric: null,
        weightImperial: null,
        position: position,
      };

      return prevExercises.map((ex) =>
        ex.instanceId === instanceId
          ? { ...ex, sets: [...ex.sets, newSet] }
          : ex
      );
    });
  };

  const onUpdateSet = (instanceId: string, set: BasicWorkoutExerciseSet) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.instanceId === instanceId
          ? {
              ...ex,
              sets: ex.sets.map((s) => (s.id === set.id ? set : s)),
            }
          : ex
      )
    );
  };

  const onDuplicateSet = (
    instanceId: string,
    set: BasicWorkoutExerciseSet,
    index: number
  ) => {
    setExercises((prevExercises) => {
      const newSetId =
        prevExercises.reduce((acc, ex) => {
          return Math.max(acc, ...ex.sets.map((s) => s.id));
        }, 0) + 1;
      const newSet = {
        ...set,
        id: newSetId,
        position: index + 1,
      };

      return prevExercises.map((ex) =>
        ex.instanceId === instanceId
          ? {
              ...ex,
              sets: [
                ...ex.sets.slice(0, index),
                newSet,
                ...ex.sets.slice(index),
              ],
            }
          : ex
      );
    });
  };

  const getErrorMessage = (index: number) => {
    if (!errors || !errors[index]?.sets) return null;

    const setErrors = errors[index]?.sets;
    if (!setErrors) return null;

    if (setErrors?.message) {
      return setErrors.message;
    }

    for (const setIndex in setErrors) {
      const setError = setErrors[setIndex];
      if (typeof setError === "object") {
        if ("message" in setError) {
          return setError.message;
        }
        for (const field in setError) {
          if (setError[field as keyof BasicWorkoutExerciseSet]?.message) {
            return setError[field as keyof BasicWorkoutExerciseSet]!.message;
          }
        }
      }
    }

    return "Error in sets";
  };

  const isSetError = (index: number, setIndex: number) => {
    if (!errors || !errors[index]?.sets) return false;

    const setErrors = errors[index]?.sets;
    if (!setErrors) return false;

    const setError = setErrors[setIndex];
    if (typeof setError === "object") {
      if ("message" in setError) {
        return true;
      }
      for (const field in setError) {
        if (setError[field as keyof BasicWorkoutExerciseSet]?.message) {
          return true;
        }
      }
    }

    return false;
  };

  return (
    <DragDropContext onDragEnd={onExerciseDragEnd}>
      <Droppable droppableId="exercises" type="exercise">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(snapshot.isDraggingOver && "bg-slate-50")}
          >
            {exercises.map((exercise, index) => (
              <Draggable
                key={exercise.instanceId}
                draggableId={exercise.instanceId}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    className={cn(
                      "select-none py-4 px-2 rounded-md",
                      snapshot.isDragging && "bg-slate-200",
                      disabled && "opacity-50 pointer-events-none"
                    )}
                  >
                    <ExerciseCard
                      exercise={exercise}
                      index={index}
                      onDelete={() => onDeleteExercise(exercise.instanceId)}
                    />
                    {/* // TODO: add a formula input to quickly generate sets (e.g. 3x5 @ 20kg @ 8rpe) */}
                    <Table wrapperClassName="pl-20 pb-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10"></TableHead>
                          <TableHead>Set</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead>
                            Weight ({units === "metric" ? "kg" : "lbs"})
                          </TableHead>
                          <TableHead>RPE</TableHead>
                          <TableHead>Duration (s)</TableHead>
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>

                      <Droppable
                        key={exercise.instanceId}
                        droppableId={exercise.instanceId}
                        type="exercise-set"
                      >
                        {(provided, snapshot) => (
                          <TableBody
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn(
                              snapshot.isDraggingOver && "bg-slate-50"
                            )}
                          >
                            {exercise.sets.map((set, setIndex) => (
                              <Draggable
                                key={`${exercise.instanceId}-set-${set.id}`}
                                draggableId={`${exercise.instanceId}-set-${set.id}`}
                                index={setIndex}
                              >
                                {(provided, snapshot) => (
                                  <ExerciseSetForm
                                    provided={provided}
                                    isDragging={snapshot.isDragging}
                                    set={set}
                                    index={setIndex}
                                    onUpdate={(set) =>
                                      onUpdateSet(exercise.instanceId, set)
                                    }
                                    onDuplicate={() =>
                                      onDuplicateSet(
                                        exercise.instanceId,
                                        set,
                                        setIndex
                                      )
                                    }
                                    onDelete={() =>
                                      onDeleteSet(exercise.instanceId, set.id)
                                    }
                                    isError={isSetError(index, setIndex)}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}

                            {getErrorMessage(index) != null && (
                              <TableRow>
                                <TableCell className="w-10"></TableCell>
                                <TableCell colSpan={7}>
                                  <p className="text-sm font-medium text-destructive">
                                    {getErrorMessage(index)}
                                  </p>
                                </TableCell>
                              </TableRow>
                            )}
                            <TableRow>
                              <TableCell className="w-10"></TableCell>
                              <TableCell colSpan={7}>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => {
                                    onAddSet(
                                      exercise.instanceId,
                                      exercise.sets.length + 1
                                    );
                                  }}
                                >
                                  + Add Set
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )}
                      </Droppable>
                    </Table>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
