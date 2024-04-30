import React from 'react';
import { useState,useEffect } from 'react';
import {useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRecipes = async () => {
            const apiUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'; // Replace with your actual API endpoint
            const fetchedRecipes = [];
    
          try {
            for (let i = 0; i < 8; i++) {
              const response = await fetch(apiUrl);
              const data = await response.json();
                console.log(data);
              if (data.meals && data.meals.length > 0) {
                fetchedRecipes.push(data.meals[0]);
              }
            }
            console.log(fetchedRecipes)
            setRecipes(fetchedRecipes);
          } catch (error) {
            console.error('Error fetching recipes:', error);
          }
        };
    
        fetchRecipes();
      }, []);

  return (
    <div className="w-96 border-r-2 border-dotted min-h-screen p-4 pt-0 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Today's Recipes</h2>
      {recipes.map((recipe) => (
        <div key={recipe.idMeal} className="pb-3 mb-3 border-b-2 border-gray-400 border-dotted">
          <div className="flex">
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-20 h-20 mr-4 mt-2 object-cover" />
            <div>
              <h3 className="text-lg font-semibold">{recipe.strMeal.slice(0,30)}</h3>
              <div className="text-sm text-gray-500 flex">
                <p><span className='w-1 h-1 mx-1 mb-0.5 rounded-full inline-block bg-orange-500'></span>{recipe.strCategory}</p>
                <p><span className='w-1 h-1 mb-0.5 mx-1 rounded-full inline-block bg-orange-500'></span>{recipe.strArea}</p>
              </div>
              <div className="text-sm ">
                  <p className='inline'>{recipe.strInstructions.slice(0, 55)+" "}<span onClick={()=>navigate('/recipepage',{state:{recipe:recipe}})} className="text-blue-500 cursor-pointer">Read more...</span></p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default Sidebar;


  