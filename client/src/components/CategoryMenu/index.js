import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { idbPromise } from "../../utils/helpers";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
// useStoreContent from globalSate.js file
function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  
  // Because we only need the categories array out of our global state, we simply destructure it out of state so we can use it to provide to our returning JSX

  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);
  //ut the beauty of the useEffect() Hook is that it not only runs on component load, but also when some form of state changes in that component. So when useQuery() finishes, and we have data in categoryData, the useEffect() Hook runs again and notices that categoryData exists! Because of that, it does its job and executes the dispatch() function.

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
    //to update the click handler to update our global state instead of using the function we receive as a prop from the Home component
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
