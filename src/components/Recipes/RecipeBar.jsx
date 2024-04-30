import React, { useState, useEffect } from 'react';

import { FaSearch } from 'react-icons/fa';
import AnimatedText from '@/components/home/AnimatedText';
import RecipeCategories from './RecipeCategories';
const text = [
    "Wanna try new recipes?",
    "Aspire to be a 5-star chef?",
    "Ready to elevate your cooking skills?",
    "Hungrezy is your saviour.",
    "Embark on a flavor-filled journey!"
]

const RecipeBar = ({searchText,setSearchText,handleSearch,handleCategorySearch}) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
     if(window.scrollY > 0){
        setSticky(true);
     }
     else setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div
      className={` ${
        isSticky ? "bg-white text-white p-4 shadow-md flex justify-between h-24 z-50" : "h-fit flex"
      } sticky top-0 transition-colors duration-300 ease-in-out `}
    >
      <div className={`w-1/2 ${isSticky? 'flex justify-between w-full':'flex-col pt-60 pl-32 pr-10'}`}>
            
        <div className="flex items-center space-x-4 font-semibold ">
            <h1 className={` font-extrabold  ${isSticky? 'text-3xl text-orange-400':'text-5xl text-orange-500/90 mb-2.5'}`}>Food Recipes</h1>
        </div>
        {
            isSticky==false &&
            <div className='mb-10 text-lg'>
                <AnimatedText textArray={text}/>
            </div>
        }
  

      {/* Search Bar */}
      <div className="relative mr-4">
        <div>
            <input
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            type="text"
            placeholder="Search for recipes..."
            className={`w-[22rem] h-16 pl-16 pr-2 focus:outline-none ${isSticky? 'text-gray-500': 'border-orange-400 border-2 outline-orange-500  text-orange-500 border-r-0'}`}
            />
            {
                isSticky==false &&
                <button onClick={()=>handleSearch()} className='bg-orange-500 h-16 px-5 text-white  border-orange-500'>Search</button>
            }
        </div>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className={`h-6 w-6  ${isSticky?'text-gray-500 mt-3':'text-orange-500'}`} />
        </div>
      </div>
      </div>
    {
        isSticky==false &&
        <div className=' w-1/2 h-96 mt-44 ml-2 overflow-auto'>
            <RecipeCategories handleCategorySearch={handleCategorySearch}/>
        </div>
    }
    </div>
  );
};

export default RecipeBar;
