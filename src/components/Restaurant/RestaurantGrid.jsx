import React, { useState, useRef, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';

const RestaurantGrid = ({ restaurants,visibleRestaurants,setVisibleRestaurants }) => {
  
  const [loading, setLoading] = useState(false);
  const gridRef = useRef(null);

  const loadMoreRestaurants = () => {
    setLoading(true);
    // Simulate an API call or any asynchronous operation to load more restaurants
    setTimeout(() => {
      setVisibleRestaurants((prev) => prev + 9); // You can adjust the number of restaurants to load
      setLoading(false);
    }, 1500);
  };

  const handleIntersection = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMoreRestaurants();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, [gridRef]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-10 p-4 w-fit m-auto">
      {restaurants.slice(0, visibleRestaurants).map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} />
      ))}
      {loading &&
        Array.from({ length: 9 }).map((_, index) => (
          <div
            key={`loading-${index}`}
            className="animate-pulse w-96 bg-gray-100 rounded-xl overflow-hidden shadow-md"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 mb-2"></div>
              <div className="h-4 bg-gray-200 mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 w-1/3"></div>
            </div>
          </div>
        ))}
      <div ref={gridRef} className='h-[40rem]'></div>
    </div>
  );
};

export default RestaurantGrid;
