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
import * as React from "react";

import { Form, Container, Spinner } from "react-bootstrap";
import { Button, AppBar, Toolbar } from "@material-ui/core";

import { FoodInput } from "./FoodInput";
import { BrandedFoodEditorContainer } from "./BrandedFoodEditorContainer";
import { FoodViewerContainer } from "./FoodViewerContainer";
import { RecipeEditorContainer } from "./RecipeEditorContainer";
import * as food_input from "./store/food_input";

interface MainProps {
  loading: boolean;
  selected: food_input.State;
  select(foodId: string, description: string): void;
  deselect(): void;
  saveFood: () => void;
  newBrandedFood: () => void;
  newRecipe: () => void;
}

export const Main: React.FunctionComponent<MainProps> = (props) => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Form inline>
            <FoodInput
              {...props.selected}
              select={props.select}
              deselect={props.deselect}
            />
            <Button onClick={props.saveFood}>Save</Button>
            <Button onClick={props.newBrandedFood}>New Custom Food</Button>
            <Button onClick={props.newRecipe}>New Recipe</Button>
          </Form>
        </Toolbar>
      </AppBar>
      <Container>
        {props.loading ? <Spinner animation="border"></Spinner> : null}
        <BrandedFoodEditorContainer />
        <RecipeEditorContainer />
        <FoodViewerContainer />
      </Container>
    </React.Fragment>
  );
};
