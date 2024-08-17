import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FullRecipe() {
  const [recipeView, setRecipeView] = useState();
  const { id } = useParams();
  useEffect(() => {
    // setContent(null);
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipes/${id}`);
      const data = await response.json();
      setRecipeView(data);
    };
    fetchRecipe();
  }, []);

  // recipeView && console.log(recipeView.recipe.ingredientLines[1]);
  if (recipeView)
    return (
      <div className="flex gap-10 max-w-[1150px] mx-auto pt-6">
        <div>
          <img
            className="rounded shadow-xl"
            src={recipeView.recipe.images.LARGE.url}
            alt="image of the food"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-3xl font-semibold">
            {recipeView.recipe.label}
          </div>
          <footer>by {recipeView.recipe.source}</footer>
          <div className="flex text-center mx-auto ">
            <div className="  px-10 py-4 border-r-2 border-gray-400">
              <div className="text-3xl font-semibold">
                {recipeView.recipe.ingredients.length}
              </div>
              <div className="text-gray-800 text-sm">ingredients</div>
            </div>
            <div className="  px-10 py-4 border-r-2 border-gray-400">
              <div className="text-3xl font-semibold">
                {recipeView.recipe.totalTime}
              </div>
              <div className="text-gray-800 text-sm">minutes</div>
            </div>
            <div className="  px-10 py-4 ">
              <div className="text-3xl font-semibold">
                {Math.round(recipeView.recipe.calories)}
              </div>
              <div className="text-gray-800 text-sm">calories</div>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="border text-sm border-blue-500 py-1 px-2 rounded-xl">
              {recipeView.recipe.cuisineType}
            </div>
            <div className="border text-sm border-blue-500 py-1 px-2 rounded-xl">
              {recipeView.recipe.dishType}
            </div>
            {recipeView.recipe.cautions && (
              <div className="border text-sm border-red-600 text-red-700 py-1 px-2 rounded-xl">
                {recipeView.recipe.cautions}
              </div>
            )}
          </div>
          <div>
            <div className="border-b-2 p-2 font-semibold">Ingredients</div>
            <ul className=" list-disc px-4 py-2">
              {recipeView.recipe.ingredientLines.map((ingr, i) => {
                return (
                  <li key={i} className="p-1">
                    {ingr}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
}
