// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';
import React, { useRef, useState } from 'react';

// Import Swiper styles
import 'swiper/css';

export default () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop
      modules={[Autoplay]}
      onAutoplayTimeLeft={onAutoplayTimeLeft}
     
    >
      
      <SwiperSlide>
        <img
            src='/images/biryani.jpeg'
            className='h-[32rem]'
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
            src='/images/dominospizza.jpeg'
            className='h-[32rem]'
        />
      </SwiperSlide>
      
      <SwiperSlide>
        <img
            src='/images/login_image_1.png'
            className='h-[32rem]'
        />
      </SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
    </Swiper>
  );
};
