"use client";

import { ExerciseEquipment, ExerciseTargetMuscle } from "@/db";
import {
  Button,
  Heading,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import { EraserIcon } from "lucide-react";
import { useEffect, useReducer, useState } from "react";

interface UserExerciseFiltersProps {
  muscleGroups: ExerciseTargetMuscle[];
  equipments: ExerciseEquipment[];
  onChange?: (filters: UserExerciseFiltersState) => void;
}

const userExerciseFiltersType = ["all", "favorite", "custom"] as const;
type UserExerciseFiltersType = (typeof userExerciseFiltersType)[number];

export interface UserExerciseFiltersState {
  type: UserExerciseFiltersType;
  muscleGroup: string | null;
  equipment: string | null;
}

const initialState: UserExerciseFiltersState = {
  type: "all",
  muscleGroup: null,
  equipment: null,
};

type HandleUserExerciseFiltersTypeAction = {
  type: "handle-exercise-type";
  payload: UserExerciseFiltersType;
};
type HandleMuscleGroupAction = {
  type: "handle-muscle-group";
  payload: string | null;
};
type HandleEquipmentAction = {
  type: "handle-equipment";
  payload: string | null;
};
type ResetFiltersAction = {
  type: "reset-filters";
};

type UserExerciseFiltersAction =
  | HandleUserExerciseFiltersTypeAction
  | HandleMuscleGroupAction
  | HandleEquipmentAction
  | ResetFiltersAction;

const reducer = (
  state: UserExerciseFiltersState,
  action: UserExerciseFiltersAction
) => {
  switch (action.type) {
    case "handle-exercise-type":
      return {
        ...state,
        type: action.payload,
      };
    case "handle-muscle-group":
      return {
        ...state,
        muscleGroup: action.payload,
      };
    case "handle-equipment":
      return {
        ...state,
        equipment: action.payload,
      };
    case "reset-filters":
      return initialState;
  }
};

export const UserExerciseFilters = ({
  muscleGroups,
  equipments,
  onChange,
}: UserExerciseFiltersProps) => {
  const [key, setKey] = useState(+new Date());
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    onChange && onChange(state);
  }, [state, onChange]);

  return (
    <div className="space-y-6">
      <Heading tag="h2">Filters</Heading>
      <div>
        <Heading tag="h4" className="mb-3">
          Type
        </Heading>
        <RadioGroup
          onValueChange={(value) => {
            dispatch({
              type: "handle-exercise-type",
              payload: value as UserExerciseFiltersType,
            });
          }}
          value={state.type}
        >
          {userExerciseFiltersType.map((type) => (
            <div className="flex items-center space-x-2" key={type}>
              <RadioGroupItem value={type} id={type} />
              <Label htmlFor={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <Heading tag="h4" className="mb-3">
          Muscle Group
        </Heading>
        <Select
          key={key}
          value={state.muscleGroup ?? ""}
          onValueChange={(value) => {
            dispatch({
              type: "handle-muscle-group",
              payload: value,
            });
          }}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select muscle group" />
          </SelectTrigger>
          <SelectContent>
            {state.muscleGroup && (
              <Button
                className="w-full px-2 py-1.5 text-base justify-start"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "handle-muscle-group",
                    payload: null,
                  });
                  setKey(+new Date());
                }}
              >
                <EraserIcon className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
            {muscleGroups.map((muscleGroup) => (
              <SelectItem key={muscleGroup.slug} value={muscleGroup.slug}>
                {muscleGroup.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Heading tag="h4" className="mb-3">
          Equipment
        </Heading>
        <Select
          key={key}
          value={state.equipment ?? ""}
          onValueChange={(value) => {
            dispatch({
              type: "handle-equipment",
              payload: value,
            });
          }}
        >
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select equipment" />
          </SelectTrigger>
          <SelectContent>
            {state.equipment && (
              <Button
                className="w-full px-2 py-1.5 text-base justify-start"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "handle-equipment",
                    payload: null,
                  });
                  setKey(+new Date());
                }}
              >
                <EraserIcon className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
            {equipments.map((equipment) => (
              <SelectItem key={equipment.slug} value={equipment.slug}>
                {equipment.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          dispatch({ type: "reset-filters" });
          setKey(+new Date());
        }}
      >
        Reset
      </Button>
    </div>
  );
};
