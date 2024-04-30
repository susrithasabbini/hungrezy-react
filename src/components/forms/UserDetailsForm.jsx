import { useState } from "react";
import {useDispatch } from 'react-redux';
import { setCurrentUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner';
import { useAuth } from "../../AuthContext";

const UserDetailsForm = ({ user, setUser }) => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {signin} = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Clear the error message for the current field
    }));
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation checks here
    const validationErrors = {};
  console.log(user)
    if (!user.firstName) {
      validationErrors.firstName = 'First Name is required';
    }else delete validationErrors.firstName
  
    if (!user.lastName) {
      validationErrors.lastName = 'Last Name is required';
    }else delete validationErrors.lastName
  
    if (!user.email) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = 'Invalid email address';
    }else delete validationErrors.email
  
    if (!user.password) {
      validationErrors.password = 'Password is required';
    } else if (user.password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters long';
    }else delete validationErrors.password
  
    if (user.password !== user.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }else delete validationErrors.confirmPassword
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const {firstName,lastName,email,mobileNumber,password}=user;
        const token = user.accessToken;
        const response = await fetch(`${import.meta.env.VITE_HUNGREZY_API}/api/auth/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({firstName,lastName,email,mobileNumber,password,accessToken:token}),
        });
        const result = await response.json()
        if(!response.ok){
          const error = result.message;
          toast.error(error);
          return;
        }
        const {accessToken} = result.data
        const temp = result.data.user;
        signin(temp,accessToken);
        toast.success('Account created successfully!');
        navigate(-1);
      }catch(error){
        console.log(error)
        toast.error("Something went wrong.Please try again!")
      }
    } else {
      // If there are validation errors, update the errors state
      console.log(validationErrors);
      setErrors(validationErrors);
      if(validationErrors.firstName)toast.info(validationErrors.firstName);
      else if(validationErrors.lastName)toast.info(validationErrors.lastName);
      else if(validationErrors.email)toast.info(validationErrors.email);
      else if(validationErrors.password)toast.info(validationErrors.password);
      else if(validationErrors.confirmPassword)toast.info(validationErrors.confirmPassword);
    }
  };
 
  
  

  return (
    <div className="w-80 md:w-96">
      <div className="flex flex-col md:flex-row">
        <div className="form-floating md:mr-2 mt-2">
          <input
            className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
            id="firstName"
            placeholder="Enter First Name"
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={handleChange}
            autoFocus
          />
          <label htmlFor="firstName" className="text-gray-500">
            First Name
          </label>
        </div>
        <div className="form-floating mt-2">
          <input
            className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
            id="lastName"
            placeholder="Enter Last Name"
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={handleChange}
          />
          <label htmlFor="lastName" className="text-gray-500">
            Last Name
          </label>
        </div>
      </div>
      <div className="form-floating mt-2">
        <input
          className="form-control focus:shadow-none focus:border-amber-600 rounded-md"
          id="mobileNumber"
          placeholder="Enter mobileNumber"
          name="mobileNumber"
          type="number"
          value={user.mobileNumber}
          onChange={handleChange}
        />
        <label htmlFor="mobileNumber" className="text-gray-500">
          MobileNumber
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
          Sign Up
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

export default UserDetailsForm;
