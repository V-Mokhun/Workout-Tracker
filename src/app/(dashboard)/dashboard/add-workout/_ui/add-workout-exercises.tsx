import { BasicWorkoutExerciseSet, Units } from "@/db";
import { cn, reorder } from "@/shared/lib";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useToast,
} from "@/shared/ui";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { CircleHelpIcon, Trash2Icon } from "lucide-react";
import { useRef } from "react";
import { FieldErrors } from "react-hook-form";
import { ExerciseWithSets } from "./add-workout-form";
import { AddWorkoutFormSchema } from "./add-workout-model";
import { ExerciseCard } from "./exercise-card";
import { ExerciseSetForm } from "./exercise-set-form";

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
  const { toast } = useToast();
  const formulaInputRefs = useRef<{ [key: string]: HTMLInputElement }>({});

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

  const onClearSets = (instanceId: string) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.instanceId === instanceId ? { ...ex, sets: [] } : ex
      )
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

      const newSet: BasicWorkoutExerciseSet = {
        id: newSetId,
        duration: null,
        reps: null,
        rpe: null,
        weightMetric: null,
        weightImperial: null,
        position: position,
        type: "Normal",
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
          if (
            setError[field as keyof Omit<BasicWorkoutExerciseSet, "type">]
              ?.message
          ) {
            return setError[
              field as keyof Omit<BasicWorkoutExerciseSet, "type">
            ]!.message;
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
        if (
          setError[field as keyof Omit<BasicWorkoutExerciseSet, "type">]
            ?.message
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const handleFormulaSubmit = (instanceId: string) => {
    const inputElement = formulaInputRefs.current[instanceId];
    if (!inputElement || !inputElement.value.trim()) return;

    const formula = inputElement.value;
    const formulaParts = formula.split("-");
    const [sets, reps, weight, rpe, duration] = formulaParts;

    const numSets = sets === "_" ? 1 : parseInt(sets);
    if (isNaN(numSets)) {
      inputElement.value = "";
      return;
    }

    if (numSets > 10) {
      toast({
        title: "Too many sets",
        description: "You can only generate up to 10 sets at a time",
        variant: "destructive",
      });
      return;
    }

    const parsedReps = reps === "_" ? null : parseInt(reps) || null;
    const parsedWeight = weight === "_" ? null : parseFloat(weight) || null;
    const parsedRpe = rpe === "_" ? null : parseInt(rpe) || null;
    const parsedDuration = duration === "_" ? null : parseInt(duration) || null;

    setExercises((prevExercises) => {
      return prevExercises.map((ex) => {
        if (ex.instanceId === instanceId) {
          const maxSetId = ex.sets.reduce(
            (acc, set) => Math.max(acc, set.id),
            0
          );
          const newSets: BasicWorkoutExerciseSet[] = Array.from(
            { length: numSets },
            (_, index) => ({
              id: maxSetId + index + 1,
              reps: parsedReps,
              weightMetric: units === "metric" ? parsedWeight : null,
              weightImperial: units === "imperial" ? parsedWeight : null,
              rpe: parsedRpe,
              duration: parsedDuration,
              position: maxSetId + index + 1,
              type: "Normal",
            })
          );

          return {
            ...ex,
            sets: [...ex.sets, ...newSets],
          };
        }
        return ex;
      });
    });

    inputElement.value = "";
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
                    <div className="pl-20 my-4">
                      <label
                        htmlFor={`formula-${exercise.instanceId}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Quick Set Generator. Format:
                        sets-reps-weight-rpe-duration, i.e. 3-5-20-8. If you
                        don&apos;t want to include a value, write &quot;_&quot;
                      </label>
                      <div className="flex items-center">
                        <Input
                          id={`formula-${exercise.instanceId}`}
                          type="text"
                          placeholder="e.g., 3-5-20-8"
                          className="mr-2"
                          ref={(el) => {
                            if (el) {
                              formulaInputRefs.current[exercise.instanceId] =
                                el;
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.stopPropagation();
                              e.preventDefault();
                              handleFormulaSubmit(exercise.instanceId);
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() =>
                            handleFormulaSubmit(exercise.instanceId)
                          }
                        >
                          Generate Sets
                        </Button>
                      </div>
                    </div>
                    <Table wrapperClassName="pl-20 pb-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10"></TableHead>
                          <TableHead>Set</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead>
                            Weight ({units === "metric" ? "kg" : "lbs"})
                          </TableHead>
                          <TableHead>
                            <Tooltip>
                              <TooltipTrigger className="flex items-center gap-1 w-full h-full">
                                RPE
                                <CircleHelpIcon className="w-4 h-4" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="mb-2">
                                  Rate of Perceived Exertion
                                </p>
                                <ul>
                                  <li>
                                    <span className="text-blue-700 font-semibold">
                                      1{" "}
                                    </span>
                                    - very light
                                  </li>
                                  <li>
                                    <span className="text-cyan-300 font-semibold">
                                      2-3{" "}
                                    </span>
                                    - light
                                  </li>
                                  <li>
                                    <span className="text-green-500 font-semibold">
                                      4-5
                                    </span>{" "}
                                    - moderate, somewhat hard
                                  </li>
                                  <li>
                                    <span className="text-orange-400 font-semibold">
                                      6-7
                                    </span>{" "}
                                    - hard, vigorous
                                  </li>
                                  <li>
                                    <span className="text-orange-600 font-semibold">
                                      8-9
                                    </span>{" "}
                                    - very hard
                                  </li>
                                  <li>
                                    <span className="text-red-600 font-semibold">
                                      10
                                    </span>{" "}
                                    - max effort
                                  </li>
                                </ul>
                              </TooltipContent>
                            </Tooltip>
                          </TableHead>
                          <TableHead>Duration (s)</TableHead>
                          <TableHead className="w-10"></TableHead>
                          <TableHead className="w-10">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                onClearSets(exercise.instanceId);
                              }}
                            >
                              <Trash2Icon className="w-6 h-6" />
                            </Button>
                          </TableHead>
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
                                    units={units}
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
