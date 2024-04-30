import React from 'react';
import Sidebar from '@/components/Recipes/Sidebar';
import { useLocation } from "react-router-dom";


  const RecipePage = () => {
    const location = useLocation();
    const recipe = location.state?.recipe;
  
    const {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      strSource,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      ...ingredients
    } = recipe;
  
    const ingredientsArray = [];

for (let i = 1; i <= 20; i++) {
  const measureKey = `strMeasure${i}`;
  const ingredientKey = `strIngredient${i}`;

  const measure = recipe[measureKey];
  const ingredient = recipe[ingredientKey];

  if (measure && ingredient) {
    ingredientsArray.push(`${measure} ${ingredient}`);
  }
}

  
    return (
      <div className="flex mt-40">
        <div className="mt-12">
          <Sidebar />
        </div>
  
        <div className="w-2/3 mx-auto my-8 bg-white rounded-lg overflow-hidden shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-4">{strMeal}</h1>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column - Image and Ingredients */}
            <div>
              <img src={strMealThumb} alt={strMeal} className="w-full h-auto mb-4" />
  
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc ml-4">
                {ingredientsArray.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
                </ul>

            </div>
  
            {/* Right column - Instructions and additional details */}
            <div>
              <h2 className="text-xl font-semibold mb-2">Instructions</h2>
              <p className="text-gray-700 mb-4">{strInstructions}</p>
  
              <div className="mb-4">
                <p>
                  <span className="font-semibold">Category:</span> {strCategory}
                </p>
                <p>
                  <span className="font-semibold">Area:</span> {strArea}
                </p>
                <p>
                  <span className="font-semibold">Tags:</span> {strTags || 'N/A'}
                </p>
              </div>
  
              <div className="mb-4">
                <p>
                  <span className="font-semibold">Video Recipe:</span>{' '}
                  <a href={strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Watch Video
                  </a>
                </p>
                <p>
                  <span className="font-semibold">Source:</span>{' '}
                  <a href={strSource} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    {strSource}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default RecipePage;