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
import { RootState, ThunkDispatch } from "./store";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Main } from "./Main";
import { selectRecipe, selectIngredient } from "./store";

function mapStateToProps(state: RootState) {
  return {
    recipeTitles:
      state.type == "Loading"
        ? null
        : state.document.recipes.map((recipe) => recipe.title),
    selectedRecipeIndex:
      state.type == "Loading" ? 0 : state.selectedRecipeIndex,
    selectedIngredientIndex:
      state.type == "Loading" ? 0 : state.selectedIngredientIndex,
    ingredientStrings:
      state.type == "Loading"
        ? null
        : state.document.recipes[state.selectedRecipeIndex].ingredients.map(
            (ingredient) =>
              ingredient.amount +
              " " +
              ingredient.unit +
              " " +
              ingredient.ingredient.description
          ),
    errors: state.type == "Loading" ? [] : state.errors,
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch) {
  return bindActionCreators(
    {
      selectRecipe,
      selectIngredient,
    },
    dispatch
  );
}

export const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);
