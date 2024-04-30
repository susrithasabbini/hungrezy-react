import React, { useState, useEffect } from 'react';

import { FaSearch } from 'react-icons/fa';
import LocationSearch from './LocationSearch';

const RestaurantTopBar = ({location,setLocation,searchText,setSearchText}) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div
      className={`p-4 shadow-md flex justify-between h-24 ${
        isSticky ? "bg-white text-white" : "bg-amber-300 text-white"
      } sticky top-0 transition-colors duration-300 ease-in-out z-0`}
    >
      {/* Location Selector */}
      <div className="flex items-center space-x-4 font-semibold">
        <LocationSearch isSticky = {isSticky} searchText={location} setSearchText={setLocation}/>
      </div>

      {/* Search Bar */}
      <div className="relative mr-4">
        <input
          type="text"
          placeholder="Search for restaurants..."
          value={searchText}
          className="w-[40rem] h-12 pl-16 pr-2 rounded  text-gray-500 focus:outline-none"
          onChange={(e)=>setSearchText(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="h-6 w-6 text-gray-300" />
        </div>
      </div>
    </div>
  );
};

export default RestaurantTopBar;
