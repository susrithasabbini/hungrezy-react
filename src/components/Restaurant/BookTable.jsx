import React, { useState, useEffect } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { IoIosSunny } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { addBooking } from '../../redux/slices/tableBookingSlice';


const BookTable = ({currentUser,restaurant,setTableBooked}) => {
  const [guests, setGuests] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dispatch = useDispatch();
 

  const handleGuestsChange = (increment) => {
    setGuests((prevGuests) => (increment ? prevGuests + 1 : Math.max(prevGuests - 1, 1)));
  };

  const handleDateSelect = (date) => {
    console.log(date)
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    if (time > currentTime) {
        console.log(time)
      setSelectedTime(time);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update current time every minute

    return () => clearInterval(interval);
  }, []);

  const isLunchTime = (time) => {
    return time >= new Date().setHours(11, 0, 0) && time <= new Date().setHours(16, 0, 0);
  };

  const isDinnerTime = (time) => {
    return time >= new Date().setHours(16, 30, 0) && time <= new Date().setHours(23, 0, 0);
  };



const generateTimeCards = (selectedDate, start, end, interval) => {
    const timeCards = [];
    
    const convertToDate = (date) => {
      return typeof date === 'string' ? new Date(date) : date;
    };
  
    for (let time = start; time <= end; time += interval) {
      const dateTime = new Date(time);
      const currentDate = convertToDate(selectedDate) || new Date();
  
      if (!(currentDate instanceof Date) || isNaN(currentDate.getTime())) {
        // Handle the case where currentDate is not a valid Date object
        console.error('Invalid selectedDate:', selectedDate);
        return [];
      }
  
      dateTime.setFullYear(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
      timeCards.push(
        <div
          key={time}
          className={`time-card border-2 p-2 w-fit rounded-lg m-2 ${selectedTime &&
            dateTime.getDate() === selectedTime.getDate() && dateTime.getHours()==selectedTime.getHours() && dateTime.getMinutes()==selectedTime.getMinutes() &&
            ' border-amber-400 bg-amber-100 text-amber-400 cursor-pointer'}
            ${dateTime < currentTime && 'bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed'} ${dateTime>currentTime && 'cursor-pointer'}`}
          onClick={() => handleTimeSelect(dateTime)}
        >
          {dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      );
    }
    return timeCards;
  };


  const handleProceedClick = () => {
    // Assuming you have the necessary information for a booking
    const bookingDetails = {
      guests,
      date: selectedDate,
      time: selectedTime,
      user : currentUser,
      restaurantName : restaurant.name,
      restaurantAddress : restaurant.address,
    };

    // Dispatch the action to add a new booking
    dispatch(addBooking(bookingDetails));
    setTableBooked(true);
  };

  

  

  return (
    <div className="w-full mt-10">
      <div className="mb-4">
        <div className="text-lg font-bold mb-3 text-gray-700">Number of Guests</div>
        <div className='flex'>
        <FaUserGroup className='inline text-4xl text-gray-500 mr-4 mt-1.5'/>
        <div className="flex  items-center border-2 w-fit p-2 px-3 rounded-lg">
          <FaMinus className="cursor-pointer text-gray-400" onClick={() => handleGuestsChange(false)} />
          <span className="mx-4 text-xl text-gray-700 font-medium">{guests}</span>
          <FaPlus className="cursor-pointer text-orange-300" onClick={() => handleGuestsChange(true)} />
        </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-bold mb-3 text-gray-700 ">When are you visiting?</div>
        <div className="flex gap-4 overflow-auto scrollbar-h-1 pb-4 scrollbar-track-gray-200 scrollbar-thumb-gray-500">
          {[...Array(30).keys()].map((index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            return (
              <div
                key={index}
                className={`flex flex-col py-4 px-3 border-2 rounded cursor-pointer ${
                  selectedDate === date.toDateString() ? ' border-amber-400 bg-amber-100 text-amber-400' : ''
                }`}
                onClick={() => handleDateSelect(date.toDateString())}
              >
                <div className="text-gray-700 font-bold mb-1">
                  {date.toLocaleDateString([], { weekday: 'short' })}
                </div>
                <div className='flex text-sm  text-gray-600'>
                    <div>
                        {date.getDate()}
                    </div>
                    <div className='ml-2'>
                        {date.toLocaleDateString([], { month: 'short' })}
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-gray-700">Select time of day</div>
        <div className="flex gap-4">
          <div className="flex-1 border-2 rounded-xl">
                <div className="text-lg text-gray-600 font-bold mt-2 ml-2"><IoIosSunny className='inline text-4xl text-gray-500 mr-1 mb-1'/>Lunch</div>
                   <div className='flex flex-wrap px-8 pb-4 pt-2'>
                        {generateTimeCards(
                        selectedDate,
                        new Date().setHours(11, 0, 0),
                        new Date().setHours(16, 0, 0),
                        30 * 60 * 1000
                        )}
                   </div>
                </div>
            </div>
            <div className="flex-1 border-2 rounded-xl mt-4">
            <div className="text-lg font-bold text-gray-600 mt-2 ml-2"><IoMdMoon className='inline text-4xl text-gray-500 mr-1 mb-1.5'/>Dinner</div>
                <div className='flex flex-wrap px-8 pb-4 pt-2'>
                    {generateTimeCards(
                    selectedDate,
                    new Date().setHours(16, 30, 0),
                    new Date().setHours(23, 0, 0),
                    30 * 60 * 1000
                    )}
                </div>
            
          </div>
        </div>

      <button
        className={`w-full py-2 bg-orange-500 text-white font-bold rounded ${
          selectedDate && selectedTime ? 'cursor-pointer hover:bg-orange-600' : 'cursor-not-allowed bg-orange-200'
        }`}
        disabled={!selectedDate || !selectedTime}
        onClick={handleProceedClick}
      >
        Proceed
      </button>
    </div>
  );
};

export default BookTable;
