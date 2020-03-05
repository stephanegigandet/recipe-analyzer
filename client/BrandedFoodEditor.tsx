import * as React from 'react';

import { Form, Col } from 'react-bootstrap';
import { RootState } from './RootState';
import { connect } from 'react-redux';
import { Action } from './actions';
import { BrandedFood } from '../core/FoodDataCentral';

interface BrandedFoodEditorProps {
  description: string,
  householdServingFullText: string,
  servingSize: number,
  servingSizeUnit: string,
  nutrients: {id: number, description: string, value: number}[],

  updateDescription(value: string): void,
  updatehouseholdServingFullText(value: string): void,
  updateServingSize(value: number): void,
  updateServingSizeUnit(value: string): void,
  updateNutrientValue(id: number, value: number): void,
}

const BrandedFoodEditorView: React.SFC<BrandedFoodEditorProps> = props => {
  return <React.Fragment>
      <Form>
        <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={props.description}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updateDescription(event.target.value)}
              />
        </Form.Group>
        <Form.Row>
          <Form.Group as={Col} controlId="formHouseholdUnit">
            <Form.Label>Household Units</Form.Label>
            <Form.Control
              value={props.householdServingFullText}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updatehouseholdServingFullText(event.target.value)}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="formServingSize">
            <Form.Label>Serving Size</Form.Label>
            <Form.Control
              value={props.servingSize.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updateServingSize(Number(event.target.value))}
              />
          </Form.Group>
          <Form.Group as={Col} controlId="formServingSizeUnits">
            <Form.Label>Units</Form.Label>
            <Form.Control
              as="select"
              value={props.servingSizeUnit}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updateServingSizeUnit(event.target.value)}
              >
              <option>ml</option>
              <option>g</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        { props.nutrients.map(nutrient => (
          <Form.Group controlId={"form-" + nutrient.description}>
            <Form.Label>{nutrient.description}</Form.Label>
            <Form.Control
              value={nutrient.value.toString()}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.updateNutrientValue(nutrient.id, Number(event.target.value))}
              />
          </Form.Group>
        )) }
      </Form>
    </React.Fragment>;
}

function mapStateToProps(state: RootState) {
  let food = state.food as BrandedFood;
  let nutrientNamesById: {[index: number]: string} = {};
  (state.nutrientInfos || []).forEach(nutrientInfo => {
    nutrientNamesById[nutrientInfo.id] = nutrientInfo.name;
  });
  return {
    description: food.description,
    householdServingFullText: food.householdServingFullText || '',
    servingSize: food.servingSize,
    servingSizeUnit: food.servingSizeUnit,
    nutrients: food.foodNutrients.map(nutrient => ({
      id: nutrient.nutrient.id,
      description: nutrientNamesById[nutrient.nutrient.id],
      value: nutrient.amount || 0,
    })),
  };
}

function mapDispatchToProps(dispatch: React.Dispatch<Action>) {
  return {
    updateDescription: (value: string) => dispatch({
      type: 'UpdateDescription',
      description: value
    }),
    updatehouseholdServingFullText: (value: string) => dispatch({
      type: 'UpdateHouseholdUnit',
      householdUnit: value
    }),
    updateServingSize: (value: number) => dispatch({
      type: 'UpdateServingSize',
      servingSize: value
    }),
    updateServingSizeUnit: (value: string) => dispatch({
      type: 'UpdateServingSizeUnit',
      servingSizeUnit: value
    }),
    updateNutrientValue: (id: number, value: number) => dispatch({
      type: 'UpdateNutrientValue',
      nutrientId: id,
      value: value,
    }),
  }
}

export const BrandedFoodEditor = connect(mapStateToProps, mapDispatchToProps)(BrandedFoodEditorView);