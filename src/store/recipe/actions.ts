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
import { FoodRef } from "../../../core/FoodRef";
import { Action, ActionType } from "./types";
import { getFood } from "../../IngredientDatabaseImpl";
import { normalizeFood } from "../../../core/normalizeFood";
import { RootState } from "..";
import { ThunkAction } from "redux-thunk";

type ThunkResult<R> = ThunkAction<R, RootState, undefined, Action>;

export function loadIngredient(index: number, foodId: string): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const food = await getFood(foodId);
    const normalizedFood = food ? await normalizeFood(food, getFood, getState().nutrientInfos?.map(nutrientInfo => nutrientInfo.id) || []) : null;
    if (normalizedFood != null) {
      dispatch({type: ActionType.UPDATE_INGREDIENT_FOOD, index, food: normalizedFood});
    }
  }
}

export function addIngredient(foodRef: FoodRef): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    dispatch({type: ActionType.ADD_INGREDIENT, foodRef});
    dispatch(loadIngredient(getState().recipeState!.ingredients.length, foodRef.foodId));
  }
}

export function updateIngredientAmount(index: number, amount: number): Action {
  return {type: ActionType.UPDATE_INGREDIENT_AMOUNT, index, amount};
}

export function updateIngredientUnit(index: number, unit: string): Action {
  return {type: ActionType.UPDATE_INGREDIENT_UNIT, index, unit};
}

export function deselectIngredient(index: number): Action {
  return {type: ActionType.DESELECT_INGREDIENT, index};
}

export function selectIngredient(index: number, foodRef: FoodRef): ThunkResult<Promise<void>> {
  return async dispatch => {
    dispatch({type: ActionType.UPDATE_INGREDIENT_ID, index, foodRef});
    dispatch(loadIngredient(index, foodRef.foodId));
  }
}
