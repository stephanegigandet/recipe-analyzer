// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { ActionType, Action } from "./types";
import { RootAction, ActionType as RootActionType } from "../types";

function makeRootAction(action: Action): RootAction {
  return { type: RootActionType.UPDATE_BRANDED_FOOD_EDIT_STATE, action };
}

export function updateDescription(description: string): RootAction {
  return makeRootAction({ type: ActionType.UPDATE_DESCRIPTION, description });
}

export function updateServingSize(servingSize: string): RootAction {
  return makeRootAction({ type: ActionType.UPDATE_SERVING_SIZE, servingSize });
}

export function updateServingSizeUnit(servingSizeUnit: string): RootAction {
  return makeRootAction({
    type: ActionType.UPDATE_SERVING_SIZE_UNIT,
    servingSizeUnit,
  });
}

export function updateHouseholdUnit(householdUnit: string): RootAction {
  return makeRootAction({
    type: ActionType.UPDATE_HOUSEHOLD_UNIT,
    householdUnit,
  });
}

export function updateNutrientValue(
  nutrientId: number,
  value: string
): RootAction {
  return makeRootAction({
    type: ActionType.UPDATE_NUTRIENT_VALUE,
    nutrientId,
    value,
  });
}
