import { reducer } from "../utils/reducers";


// import our actions
import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../utils/actions";

// create a sample of what our global state will look like
const initialState = {
  products: [],
  categories: [{ name: "Food" }],
  currentCategory: "1",
};

test("UPDATE_PRODUCTS", () => {
  let newState = reducer(initialState, {
    type: UPDATE_PRODUCTS,
    //type: This is the type of action we're performing, and should be one of the predefined actions we created earlier.
    products: [{}, {}],
    //   value(in this case products): This won't always have the name value, but it is a name representative of the new data we want to use   with the action.
  });

  expect(newState.products.length).toBe(2);
  expect(initialState.products.length).toBe(0);
});

test("UPDATE_CATEGORIES", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CATEGORIES,
    //type: This is the type of action we're performing, and should be one of the predefined actions we created earlier.
    categories: [{}, {}],
    //   value(in this case categories): This won't always have the name value, but it is a name representative of the new data we want to use   with the action.
  });
  // The result of the reducer() should show that the length of our updated categories array will be 2, while the initial categories array should still be 1. This indicates that we didn't affect our original state values at all and simply used it to create a new version of it.

  expect(newState.categories.length).toBe(2);
  expect(initialState.categories.length).toBe(1);
});


test("UPDATE_CURRENT_CATEGORY", () => {
  let newState = reducer(initialState, {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory: "2",
  });

  expect(newState.currentCategory).toBe("2");
  expect(initialState.currentCategory).toBe("1");
});