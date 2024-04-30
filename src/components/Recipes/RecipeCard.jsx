import React from 'react';
import {useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate()
  const { strMeal, strCategory, strArea, strMealThumb, strInstructions } = recipe;

  return (
    <div className="w-full h-80 px-20 mx-auto my-8 bg-white rounded-lg overflow-hidden flex">
      {/* Left half of the card - Image and labels */}
      <div className="w-1/2 relative">
        <img src={strMealThumb} alt={strMeal} className="w-full rounded-xl h-full object-cover" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-900 to-transparent">
          <p className="text-white text-lg font-semibold">{strCategory}</p>
          <p className="text-white text-sm">{strArea}</p>
        </div>
      </div>

      {/* Right half of the card - Recipe text and button */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-semibold mb-4">{strMeal.slice(0,30)}</h2>
        <p className="text-gray-700 mb-4">{strInstructions.slice(0,500)}</p>
        <button onClick={()=>navigate('/recipepage',{state:{recipe:recipe}})} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-700 focus:outline-none">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
