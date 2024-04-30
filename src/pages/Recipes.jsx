// RecipesPage.js
import React, { useEffect, useState,useRef } from 'react';
import RecipeBar from '@/components/Recipes/RecipeBar';
import CountryCards from '@/components/Recipes/CountryCards';
import Sidebar from '@/components/Recipes/Sidebar';
import RecipeGrid from '@/components/Recipes/RecipeGrid';
import RecipeCard from '@/components/Recipes/RecipeCard';

const Recipes = () => {
    const [allRecipes, setAllRecipes] = useState([]);
    const [searchText,setSearchText] = useState('');
    const [searchResuls,setSearchResults] = useState([]);
    const [showSearchResults,setShowSearchResults] = useState(false);
    const targetDivRef = useRef(null);

    const fetchSearchResults = async ()=>{
      const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      try{
        const response = await fetch(`${apiUrl}${searchText}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          return data.meals;
        }
        return [];
      } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
      }
    }


    const fetchMealDetails = async (mealIds) => {
        const apiUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      
        try {
          const fetchRequests = mealIds.map(async (mealId) => {
            const response = await fetch(`${apiUrl}${mealId}`);
            const data = await response.json();
      
            if (data.meals && data.meals.length > 0) {
              return data.meals[0];
            }
      
            return null;
          });
      
          const mealsDetails = await Promise.all(fetchRequests);
      
          // Filter out null values (failed requests)
          return mealsDetails.filter((meal) => meal !== null);
        } catch (error) {
          console.error('Error fetching meal details:', error);
          return [];
        }
      };

    const fetchRecipesByCategory = async (category,type) => {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?${type}=${category}`;
        
        try {
          const response = await fetch(apiUrl);
          const data = await response.json();
  
          if (data.meals && data.meals.length > 0) {
            return data.meals;
          }
        } catch (error) {
          console.error(`Error fetching recipes for category ${category}:`, error);
        }
  
        return [];
      };

      const fetchAllRecipes = async () => {
        const allRecipes = [];
  
        for (const category of categories) {
          const categoryRecipes = await fetchRecipesByCategory(category.strCategory,'c');
          allRecipes.push(...categoryRecipes);
        }
  
        // Randomize the combined recipes array
        const randomizedRecipes = allRecipes.sort(() => Math.random() - 0.5);
  
        // Extract meal IDs from the randomized recipes
        const mealIds = randomizedRecipes.map((recipe) => recipe.idMeal);
  
        // Fetch full details for the randomized recipes
        const fullDetails = await fetchMealDetails(mealIds.slice(0,16));
        
       
        setAllRecipes(fullDetails);
  
      };

    useEffect(()=>{
      setShowSearchResults(false);
        fetchAllRecipes()
    },[])

    const handleSearch = async()=>{
      const results = await fetchSearchResults();
      // if (targetDivRef.current) {
      //   targetDivRef.current.scrollIntoView({ behavior: 'smooth',block:'start' });
      // }
      window.scrollTo({
        top: 350,
        behavior: 'smooth'
      });
      setSearchResults(results);
      setShowSearchResults(true);
    }

    const handleCategorySearch = async(category,type)=>{
      const results = await fetchRecipesByCategory(category,type);
      window.scrollTo({
        top: 350,
        behavior: 'smooth'
      });
      const mealIds = results.map((recipe) => recipe.idMeal);
      console.log(mealIds)
      // Fetch full details for the randomized recipes
      const fullDetails = await fetchMealDetails(mealIds);
      console.log(fullDetails)
      setSearchResults(fullDetails);
      setSearchText(category)
      setShowSearchResults(true);
    }

  return (
    <div className="w-screen min-h-screen">
      {/* Header */}
     <RecipeBar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} handleCategorySearch={handleCategorySearch}/>
    
      {/* Main Content */}
      <div className=" mt-20 ">
        <CountryCards countries={areas} handleCategorySearch={handleCategorySearch}/>
      </div>
      <div className='flex mt-40'>
            <div >
                <Sidebar recipes={meals}/>
            </div>
            {
              !showSearchResults && 
              <div>
                <RecipeGrid recipes={allRecipes.slice(0,8)}/>
                {
                  allRecipes[9] &&  <RecipeCard recipe={allRecipes[9]}/>
                }
                <RecipeGrid recipes={allRecipes.slice(10,14)}/>
            
              </div>
            }
            {
              showSearchResults &&  
              <div ref={targetDivRef}>
                  <h1 className='text-lg font-semibold ml-10'>Your Search Results for {'"'+searchText+'"'}</h1>
                  <RecipeGrid recipes={searchResuls.slice(0,4)}/>
                  {
                    searchResuls[5] &&  <RecipeCard recipe={searchResuls[5]}/>
                  }
                  <RecipeGrid recipes={searchResuls.slice(6,searchResuls.length)}/>
              
              </div>
            }
      </div>
    </div>
  );
};

export default Recipes;




const areas =  [
    {
      "strArea": "American",
      Image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq4ld-Oz3CKICvofeyLdSEevi3ZZXOexahLA&usqp=CAU"
    },
    {
      "strArea": "British",
      Image : "https://www.planetware.com/photos-large/ENG/england-stonehenge.jpg "
    },
    {
      "strArea": "Canadian",
      Image : "https://assets-news.housing.com/news/wp-content/uploads/2022/10/07124006/Canada-tourist-places-to-visit-06.jpg "
    },
    {
      "strArea": "Chinese",
      Image : "https://nitsaholidays.in/uploads/blog/736290great-wall-of-china-1600x900.webp "
    },
    {
      "strArea": "Croatian",
      Image : "https://img.traveltriangle.com/blog/wp-content/uploads/2018/06/places-to-visit-in-croatia-cover.jpg "
  
    },
    {
      "strArea": "Dutch",
      Image : "https://www.wideworldtrips.com/wp-content/uploads/2020/04/places-to-visit-in-the-netherlands-800x445.jpg "
  
    },
    {
      "strArea": "Egyptian",
      Image : "https://ihplb.b-cdn.net/wp-content/uploads/2017/02/giza-pyramids-700x430.jpg"
    },
    {
      "strArea": "Filipino",
      Image : "https://i0.wp.com/handluggageonly.co.uk/wp-content/uploads/2018/12/Hand-Luggage-Only-10-5.jpg?w=1600&ssl=1"
    },
    {
      "strArea": "French",
      Image : "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/eifel-tower-736x430.jpg "
    },
    {
      "strArea": "Greek",
      Image : "https://img.traveltriangle.com/blog/wp-content/uploads/2016/01/places-to-visit-in-greece1.jpg "
    },
    {
      "strArea": "Indian",
      Image : "https://www.holidify.com/images/compressed/attractions/attr_1448.jpg"
    },
    {
      "strArea": "Irish",
      Image : "https://focus.independent.ie/thumbor/LlAOZtmUHS9dFYy_ncvirBZjFkc=/0x86:1500x913/1280x853/prod-mh-ireland/d2c9eab0-c07c-11ed-8973-0210609a3fe2.jpg "
    },
    {
      "strArea": "Italian",
      Image : "https://www.planetware.com/photos-large/I/italy-colosseum-day.jpg "
    },
    {
      "strArea": "Jamaican",
      Image : "https://img.traveltriangle.com/blog/wp-content/uploads/2019/07/cover-page-for-Places-To-Visit-In-Jamaica.jpg "
    },
    {
      "strArea": "Japanese",
      Image : "https://static.javatpoint.com/tourist-places/images/tourist-places-in-japan.jpg "
    },
    {
      "strArea": "Kenyan",
      Image : "https://www.thomascook.in/blog/wp-content/uploads/2018/04/kenya-lamu-e1522735910487.jpg "
    },
    {
      "strArea": "Malaysian",
      Image : "https://static2.tripoto.com/media/filter/nl/img/210609/TripDocument/1474116741_destination_for_malaysian_24343.jpg"
    },
    {
      "strArea": "Mexican",
      Image : "https://www.wideworldtrips.com/wp-content/uploads/2021/05/places-to-visit-in-mexico-city-800x445.jpg"
    },
    {
      "strArea": "Moroccan",
      Image : "https://www.planetware.com/wpimages/2021/08/morocco-top-attractions-marrakesh-medina.jpg"
    },
    {
      "strArea": "Polish",
      Image : "https://www.planetware.com/wpimages/2020/03/poland-best-places-to-visit-krakow.jpg"
    },
    {
      "strArea": "Portuguese",
      Image : "https://img.traveltriangle.com/blog/wp-content/uploads/2018/06/portugal-star-trail.jpg"
    },
    {
      "strArea": "Russian",
      Image : "https://media.easemytrip.com/media/Blog/International/637007769287754861/6370077692877548617mbWum.jpg"
    },
    {
      "strArea": "Spanish",
      Image : "https://www.cuddlynest.com/blog/wp-content/uploads/2021/07/spain-tourist-attractions-seville-plaza-espana-2048x917.jpg"
    },
    {
      "strArea": "Thai",
      Image : "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/tourist-attractions-in-thailand.jpg"
    },
    {
      "strArea": "Tunisian",
      Image : "https://tourrom.com/wp-content/uploads/2019/05/El-Djem-tourist-attractions.jpg"
    },
    {
      "strArea": "Turkish",
      Image : "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/izmir-750x430.jpg"
    },

    {
      "strArea": "Vietnamese",
      Image : "https://www.tourmyindia.com/blog//wp-content/uploads/2018/02/Ho-Chi-Minh-City-1.jpg"
    }
  ]
  

    
    const  meals= [
          {
            "idMeal": "52835",
            "strMeal": "Fettucine alfredo",
            "strDrinkAlternate": null,
            "strCategory": "Pasta",
            "strArea": "Italian",
            "strInstructions": "In a medium saucepan, stir the clotted cream, butter and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.\r\nMeanwhile, put the cheese and nutmeg in a small bowl and add a good grinding of black pepper, then stir everything together (don’t add any salt at this stage).\r\nPut the pasta in another pan with 2 tsp salt, pour over some boiling water and cook following pack instructions (usually 3-4 mins). When cooked, scoop some of the cooking water into a heatproof jug or mug and drain the pasta, but not too thoroughly.\r\nAdd the pasta to the pan with the clotted cream mixture, then sprinkle over the cheese and gently fold everything together over a low heat using a rubber spatula. When combined, splash in 3 tbsp of the cooking water. At first, the pasta will look wet and sloppy: keep stirring until the water is absorbed and the sauce is glossy. Check the seasoning before transferring to heated bowls. Sprinkle over some chives or parsley, then serve immediately.",
            "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
            "strTags": null,
            "strYoutube": "https://www.youtube.com/watch?v=FLEnwZvGzOE",
            "strIngredient1": "Clotted Cream",
            "strIngredient2": "Butter",
            "strIngredient3": "Corn Flour",
            "strIngredient4": "Parmesan Cheese",
            "strIngredient5": "Nutmeg",
            "strIngredient6": "Fettuccine",
            "strIngredient7": "Parsley",
            "strIngredient8": "",
            "strIngredient9": "",
            "strIngredient10": "",
            "strIngredient11": "",
            "strIngredient12": "",
            "strIngredient13": "",
            "strIngredient14": "",
            "strIngredient15": "",
            "strIngredient16": "",
            "strIngredient17": "",
            "strIngredient18": "",
            "strIngredient19": "",
            "strIngredient20": "",
            "strMeasure1": "227g",
            "strMeasure2": "25g",
            "strMeasure3": "1 tsp ",
            "strMeasure4": "100g ",
            "strMeasure5": "Grated",
            "strMeasure6": "250g",
            "strMeasure7": "Chopped",
            "strMeasure8": "",
            "strMeasure9": "",
            "strMeasure10": "",
            "strMeasure11": "",
            "strMeasure12": "",
            "strMeasure13": "",
            "strMeasure14": "",
            "strMeasure15": "",
            "strMeasure16": "",
            "strMeasure17": "",
            "strMeasure18": "",
            "strMeasure19": "",
            "strMeasure20": "",
            "strSource": "https://www.bbcgoodfood.com/recipes/fettucine-alfredo",
            "strImageSource": null,
            "strCreativeCommonsConfirmed": null,
            "dateModified": null
          }
        ]

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

    
