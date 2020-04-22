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
import { createSelector } from "reselect";
import { State } from "../recipe_edit/types";
import { State as Ingredient } from "../ingredient/types";
import {
  getIngredientUnits as getIngredientUnits_,
  servingEquivalentQuantities,
  Nutrients,
  StatusOr,
  Food,
  nutrientsForIngredient,
} from "../../core";

export const makeGetIngredientUnits = () =>
  createSelector(
    [
      (state: State, index: number) => state.ingredients[index],
      (state: State, _: number) => state.foodCache,
    ],
    (ingredient: Ingredient, foodCache: { [index: string]: Food }) => {
      const foodId = ingredient.selected.foodId;
      if (foodId == null) {
        return [""];
      }
      if (foodCache[foodId] === undefined) {
        return [""];
      }
      return getIngredientUnits_(
        servingEquivalentQuantities(foodCache[foodId])
      ).concat([""]);
    }
  );

export function getNutrientsForIngredient(
  ingredient: Ingredient,
  foodCache: { [index: string]: Food }
): StatusOr<Nutrients> {
  const foodId = ingredient.selected.foodId;
  if (ingredient.amount == "" || ingredient.unit == "" || foodId == null) {
    // Return empty nutrients when ingredient isn't fully specified
    return {};
  }
  return nutrientsForIngredient(
    {
      quantity: {
        amount: Number(ingredient.amount),
        unit: ingredient.unit,
      },
      foodId,
    },
    foodCache
  );
}
