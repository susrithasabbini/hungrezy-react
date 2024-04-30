
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import { Navigation } from 'swiper/modules';

const CountryCards = ({ countries,handleCategorySearch }) => {
    return (
            <Swiper navigation={true} modules={[Navigation]}  slidesPerView={8} className="w-full pl-10">
                {countries.map((country, index) => (
                    <SwiperSlide key={index}>
                        <div onClick={()=>handleCategorySearch(country.strArea,'a')} className="relative w-40 h-30 bg-gray-200 rounded-lg mr-4 hover:cursor-pointer">
                        <img
                            src={country.Image ||'https://hemaskitchen.in/wp-content/uploads/2023/02/South-Indian-Cuisine-2048x1471.jpg'}
                            alt={country.strArea}
                            className="w-full h-40 object-cover rounded-t-lg filter blur-[1px] opacity-90"
                        />
                        <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-80 transition-opacity duration-300">
                            <p className="text-white text-lg font-bold">{country.strArea}</p>
                        </div>
                        </div>
                    </SwiperSlide>
                    ))}
            </Swiper>
    );
  };

  export default CountryCards;
  