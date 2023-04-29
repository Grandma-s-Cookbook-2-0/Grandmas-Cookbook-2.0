import React from "react";
import { render, getByRole, getByText} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MoreButton from "../../../client/components/recipeCardButtons/MoreButton.jsx"

// need to wrap component in Provider

test('dialog opens when More button is clicked and title of the recipe is displayed', () => {
  // ARRANGE
  render(<MoreButton recipe={{ title: 'Test Recipe', ingredientList: ['Ingredient 1', 'Ingredient 2'], directions: ['Step 1', 'Step 2'] }} />);
  
  // ACT
  // searches for button element with name "More"
  const moreButton = getByRole('button', { name: 'More' });
  // when user clicks on button
  userEvent.click(moreButton);
  // stores text element in variable
  const dialogTitle = getByText('Test Recipe');

  // ASSERT
  expect(dialogTitle).toBeInTheDocument();
});

test('dialog displays ingredient list and directions', () => {
  render(<MoreButton recipe={{ title: 'Test Recipe', ingredientList: ['Ingredient 1', 'Ingredient 2'], directions: ['Step 1', 'Step 2'] }} />);
  const moreButton = getByRole('button', { name: 'More' });
  userEvent.click(moreButton);
  const ingredientList = getByText('Ingredient 1\nIngredient 2');
  const directions = getByText('Step 1\nStep 2');
  expect(ingredientList).toBeInTheDocument();
  expect(directions).toBeInTheDocument();
});

test('Save button changes to Edit when clicked', () => {
  render(<MoreButton recipe={{ title: 'Test Recipe', ingredientList: ['Ingredient 1', 'Ingredient 2'], directions: ['Step 1', 'Step 2'] }} />);
  
  const moreButton = getByRole('button', { name: 'More' });
  userEvent.click(moreButton);
  const saveButton = getByRole('button', { name: 'Save' });
  userEvent.click(saveButton);
  const editButton = getByRole('button', { name: 'Edit' });
  expect(editButton).toBeInTheDocument();
});



