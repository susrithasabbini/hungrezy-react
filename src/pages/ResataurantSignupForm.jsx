import { useState } from "react";
import UserSignUpStepIndicator from "@/components/forms/UserSignUpStepIndicator";
import RestaurantDetailsForm from "@/components/forms/RestaurantDetailsForm";
import EmailField from "@/components/forms/EmailField";
import OTPField from "@/components/forms/OTPField";
import {toast} from 'sonner';


const RestaurantSignUpForm = () => {
  const [currStep, setCurrStep] = useState(1);
  const [restaurant, setRestaurant] = useState({
    email : '',
    restaurantName : '',
    address : '',
    password : '',
    accessToken : '',
  });
 
 const user_role = "restaurant";
  const handleEmail = (e)=>{
    setRestaurant({
      ...restaurant,
      email : e.target.value
    })
  }

  const validateEmail = (enteredEmail) => {
    if (!enteredEmail.trim()) {
      toast.warning("Please enter your email address !");       // If email is empty or contains only spaces
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(enteredEmail);
    if (!isValidFormat) {
      toast.error("Invalid email address");     // If email format is invalid
      return false;
    }
    return true;       // If email is valid
  }


 

  async function handleSendOTP() {
    const email = restaurant.email;
    if(!validateEmail(email))return;
      //todo : need to check email in user base before sending otp;
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/auth/send-verification-code`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers based on your server requirements
        },
        body: JSON.stringify({email,user_role}),
      });
      const result = await response.json();
      if (!response.ok) {
        // Handle non-successful responses here
        toast.error(result.message)
        return ;
      }
      toast.info('Please check you email for verification code.')
      setCurrStep(2);
    
    } catch (error) {
      // Handle network errors or other exceptions
      toast.error('Please try again later!')
      console.error('Error:', error);
      return ;
    }
  }
    

  const handleVerifyOTP = async(verificationCode) => {
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/auth/verify-code`;
    const email = restaurant.email;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers based on your server requirements
        },
        body: JSON.stringify({verificationCode,email,user_role}),
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        console.error('Error:', response.status, response.statusText);
        toast.error('Verification failed! Please try again.');
        setCurrStep(1);
        return null;
      }
  
      // Parse and return the response JSON
      const data = await response.json();
      setRestaurant({
        ...restaurant,
        accessToken : data.token
      })
      toast.success('Email verification successfull!');
      setCurrStep(3);
      return data;
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error.message);
      return null;
    }
  }

  if (currStep == 1)
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="flex justify-center">
          <UserSignUpStepIndicator currStep={currStep} />
        </div>

        <div className="mt-16">
          <h3 className="mb-8 w-80 text-xl text-gray-500 font-medium">
            Verify Restaurant Email
          </h3>
          <EmailField handleSendOTP={handleSendOTP} handleEmail={handleEmail} email={restaurant.email}/>
        </div>
      </div>
    );
  else if (currStep == 2)
    return (
      <div className="flex flex-col h-screen w-screen justify-center items-center">
        <div className="flex justify-center">
          <UserSignUpStepIndicator currStep={currStep} />
        </div>

        <div className="mt-16">
          <OTPField handleVerifyOTP={handleVerifyOTP} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div className="flex justify-center">
        <UserSignUpStepIndicator currStep={currStep} />
      </div>

      <div className="mt-16">
        <h3 className="mb-4 text-xl text-gray-500 font-medium">Restaurant Details</h3>
        <RestaurantDetailsForm restaurant={restaurant} setRestaurant={setRestaurant} />
      </div>
    </div>
  );
};

export default RestaurantSignUpForm;
