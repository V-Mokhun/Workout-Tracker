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

interface AddWorkoutExercisesProps {
  exercises: ExerciseWithSets[];
  setExercises: React.Dispatch<React.SetStateAction<ExerciseWithSets[]>>;
}

export const AddWorkoutExercises = ({
  exercises,
  setExercises,
}: AddWorkoutExercisesProps) => {
  const onExerciseDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.type === "exercise-set") {
      const sourceExercise = exercises.find(
        (ex) => ex.slug === result.source.droppableId
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
            ex.slug === sourceExercise.slug ? { ...ex, sets: updatedSets } : ex
          )
        );
      } else {
        const destinationExercise = exercises.find(
          (ex) => ex.slug === result.destination?.droppableId
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
            if (ex.slug === sourceExercise.slug) {
              return updatedSourceExercise;
            } else if (ex.slug === destinationExercise.slug) {
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

  const onDeleteExercise = (exerciseSlug: string) => {
    setExercises((prevExercises) =>
      prevExercises.filter((ex) => ex.slug !== exerciseSlug)
    );
  };

  const onDeleteSet = (exerciseSlug: string, setId: number) => {
    setExercises((prevExercises) =>
      prevExercises.map((ex) =>
        ex.slug === exerciseSlug
          ? { ...ex, sets: ex.sets.filter((s) => s.id !== setId) }
          : ex
      )
    );
  };

  const onAddSet = (exerciseSlug: string, position: number) => {
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
        ex.slug === exerciseSlug ? { ...ex, sets: [...ex.sets, newSet] } : ex
      );
    });
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
                key={exercise.id}
                draggableId={exercise.slug}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "select-none py-4 px-2 rounded-md",
                      snapshot.isDragging && "bg-slate-200"
                    )}
                    style={{ ...provided.draggableProps.style }}
                  >
                    <ExerciseCard
                      exercise={exercise}
                      index={index}
                      onDelete={() => onDeleteExercise(exercise.slug)}
                    />
                    <Table wrapperClassName="pl-20 pb-4">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10"></TableHead>
                          <TableHead>Set</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead>Weight</TableHead>
                          <TableHead>RPE</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead className="w-10"></TableHead>
                        </TableRow>
                      </TableHeader>

                      <Droppable
                        key={exercise.slug}
                        droppableId={exercise.slug}
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
                            {exercise.sets.map((set, index) => (
                              <Draggable
                                key={`${exercise.slug}-set-${set.id}`}
                                draggableId={`${exercise.slug}-set-${set.id}`}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <ExerciseSetForm
                                    provided={provided}
                                    isDragging={snapshot.isDragging}
                                    set={set}
                                    index={index}
                                    onDelete={() =>
                                      onDeleteSet(exercise.slug, set.id)
                                    }
                                  />
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}

                            <TableRow>
                              <TableCell className="w-10"></TableCell>
                              <TableCell colSpan={6}>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => {
                                    onAddSet(
                                      exercise.slug,
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
