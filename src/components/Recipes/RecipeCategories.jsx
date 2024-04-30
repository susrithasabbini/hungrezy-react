import React from 'react';

const RecipeCategories = ({handleCategorySearch}) => {
  const categories = [
    {
      "strCategory": "Chicken",
      "image": "https://www.licious.in/blog/wp-content/uploads/2020/12/Pan-Fried-Chicken.jpg"
    },
    {
      "strCategory": "Breakfast",
      "image": "https://www.foodandwine.com/thmb/OH220PwOZfcTiwuJzkvLANWHw1w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/egg-bhurjee-FT-RECIPE0521-f9573d8c81bb4c9597a9621c0ac064ae.jpg"
    },
    {
      "strCategory": "Dessert",
      "image": "https://www.tasteofhome.com/wp-content/uploads/2019/05/Fried-Ice-Cream-Dessert-Bars-_EXPS_SDJJ19_232652_B02_06_1b_rms-2.jpg"
    },
    {
      "strCategory": "Vegetarian",
      "image": "https://images.immediate.co.uk/production/volatile/sites/2/2020/05/olive_GoldenOnionPilaf_preview-b26daf2.jpg?quality=90&resize=556,505"
    },
    {
      "strCategory": "Goat",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhR11f2WMtmNa43BEwYhy6SsFOkaYhB96wEw&usqp=CAU"
    },
    {
      "strCategory": "Pasta",
      "image": "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/05/red-sauce-pasta-recipe.jpg"
    },
    {
      "strCategory": "Seafood",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZ-ax79D4TLtXhH2J7UsOUhyIeF1otaNgiA&usqp=CAU"
    },
    {
      "strCategory": "Beef",
      "image": "https://mojo.generalmills.com/api/public/content/LASaPpVD5E6LGty8lf97zA_gmi_hi_res_jpeg.jpeg?v=7059e7bf&t=466b54bb264e48b199fc8e83ef1136b4"
    },
    {
      "strCategory": "Starter",
      "image": "https://drop.ndtv.com/albums/COOKS/these-5-yummy-s_637861425887413019/637861425905672423.jpeg"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category, index) => (
        <div onClick={()=>handleCategorySearch(category.strCategory,'c')} key={index} className={`relative group overflow-hidden bg-gray-200 rounded-lg hover:cursor-pointer ${category.strCategory === 'Chicken' ? 'md:row-span-2' : ''} ${category.strCategory === 'Breakfast' ? 'lg:col-span-2' : ''}`}>
          <img src={category.image} alt={category.strCategory} className={`w-full  ${category.strCategory === 'Chicken' ? 'h-80' : 'h-40'} object-cover rounded-t-lg filter blur-[1px] opacity-80`} />
          <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-80 transition-opacity duration-300">
            <p className="text-white text-lg font-bold">{category.strCategory}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCategories;
