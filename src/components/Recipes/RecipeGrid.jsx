import React from 'react';
import {useNavigate } from 'react-router-dom';

const RecipeGrid = ({ recipes }) => {
  const navigate = useNavigate()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 p-4">
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} className="bg-white w-fit p-4 rounded-lg  transition-transform transform hover:scale-105">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-60 h-40 object-cover rounded-md mb-4" />
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">{recipe.strMeal.slice(0,25)}</h3>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500 font-medium">
              <p>{recipe.strCategory}</p>
              <p>{recipe.strArea}</p>
            </div>
            <button onClick={()=>navigate('/recipepage',{state:{recipe:recipe}})} className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition">View Recipe</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
