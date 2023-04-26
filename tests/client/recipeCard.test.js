import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from 'redux-mock-store';
import RecipeCard from "../../client/components/recipeCard.jsx";

describe('RecipeCard', () => {
  
  let testCard;
  const card = {
    description: "a test recipe",
    directions: [
      "step 1",
      "step 2",
      "step 3: Enjoy!"
    ],
    id: 5,
    imagePath:
    "https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/1906378ec8e946d8be034e3273c62a1b.jpeg",
    ingredientList: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
    title: 'Croissant Breakfast Pizza'
  }
  const initialState = { card};
  const mockStore = configureStore();
  const store = mockStore(initialState);
  
  // const props = {
  //   recipe: card,
  //   title: card.title,
  //   image: card.imagePath
  // }

  beforeEach(()=> {
    
    testCard = render(
      <Provider store ={store}>
        <RecipeCard recipe = {card} title={card.title} image={card.imagePath}/>
      </Provider>  
    )
    screen.debug();
  });

  it('renders title', () => {
    expect(testCard.getByText("Croissant Breakfast Pizza")).toBeInTheDocument();
  });
  it('renders image', () => {
    const displayImage = screen.getByRole('img')
    expect(displayImage.getAttribute('src')).toBe("https://img.buzzfeed.com/tasty-app-user-assets-prod-us-east-1/recipes/1906378ec8e946d8be034e3273c62a1b.jpeg");
  });
  it('renders button', () => {
    const displayButton = screen.getByRole('button', {name: "Delete"})
    expect(displayButton).toBeInTheDocument();
  });
  
})