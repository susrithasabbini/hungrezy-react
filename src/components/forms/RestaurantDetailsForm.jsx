import { useState } from "react";
import {toast} from 'sonner';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const RestaurantDetailsForm = ({ restaurant, setRestaurant }) => {
  const navigate = useNavigate()
  const {signin} = useAuth();
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value,
    }));
  };

  const validateName = () => {
    if (!restaurant.restaurantName.trim()) {
      toast.warning("Restaurant name is required");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    // Add your password validation logic here
    // Example: Check if password contains one capital letter, one small letter, special character, and a number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(restaurant.password)) {
      toast.warning("Password must contain at least 1 capital letter, 1 small letter, 1 special character, and 1 number");
      return false;
    }
    return true;
  };

  const validateConfirmPassword = () => {
    if (restaurant.password !== restaurant.confirmPassword) {
      toast.warning("Passwords do not match");
      return false;
    }
    return true;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateName() && validatePassword() && validateConfirmPassword()) {
      const token = restaurant.accessToken;
      const {email,password}=restaurant;
      const name = restaurant.restaurantName
      try{
        const response = await fetch(`${import.meta.env.VITE_HUNGREZY_API}/api/auth/restaurant/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name,email, password,accessToken:token }),
        });
        const result = await response.json()
        if(!response.ok){
          const error = result.message;
          toast.error(error);
          return;
        }
        const {user,accessToken} = result.data
        signin(user,accessToken);
        toast.success('Account created successfully!');
        navigate('/restaurant/dashboard');
      }catch(error){
        console.log(error)
        toast.error("Something went wrong.Please try again!")
      }
    }
  };

  
  return (
    <div className="w-80 md:w-96">
     
        <div className="form-floating mt-2">
          <input
            className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
            id="restaurantName"
            placeholder="Enter  Name"
            name="restaurantName"
            type="text"
            value={restaurant.restaurantName}
            onChange={handleChange}
            autoFocus
          />
          <label htmlFor="firstName" className="text-gray-500">
            Restaurant Name
          </label>
        </div>
      
      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
          id="password"
          placeholder="Enter Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <label htmlFor="password" className="text-gray-500">
          Password
        </label>
      </div>
      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
          id="confirmPassword"
          placeholder="Enter Password"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword" className="text-gray-500">
          Confirm Password
        </label>
      </div>
      <div className="mt-6">
        <button onClick={handleSubmit} className="h-10 w-full bg-amber-500 text-white text-md font-semibold hover:bg-amber-600 ease-in-out duration-300 transition-colors rounded-md">
          Create Account
        </button>
      </div>
      <div className="mt-10 flex flex-row ">
        <h6 className="text-gray-500 font-medium text-sm w-fit hover:cursor-pointer hover:text-gray-400">
          By creating account, you are accepting all T&C
        </h6>
      </div>
    </div>
  );
};

export default RestaurantDetailsForm;
