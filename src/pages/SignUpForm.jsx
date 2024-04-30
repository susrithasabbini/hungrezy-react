import { useState } from "react";
import UserSignUpStepIndicator from "@/components/forms/UserSignUpStepIndicator";
import UserDetailsForm from "@/components/forms/UserDetailsForm";
import MobileField from "@/components/forms/MobileField";
import OTPField from "@/components/forms/OTPField";
import EmailField from "@/components/forms/EmailField";
import {toast} from 'sonner';


const SignUpForm = () => {
  const [currStep, setCurrStep] = useState(1);
  const [user, setUser] = useState({
    mobileNumber : '',
    firstName : '',
    lastName : '',
    email : '',
    password : '',
    accessToken : ''
  });
 

  const user_role = "user";
  const handleEmail = (e)=>{
    setUser({
      ...user,
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

  const handleMobileNumber = (e)=>{
    setUser({
      ...user,
      mobileNumber : e.target.value
    })
  }

 
  async function handleSendOTP() {
    const email = user.email;
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
    const email = user.email;
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
      setUser({
        ...user,
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
            Verify Your Email
          </h3>
          {/* <MobileField handleSendOTP={handleSendOTP} handleMobileNumber={handleMobileNumber} mobileNumber={user.mobileNumber}/> */}
          <EmailField handleSendOTP={handleSendOTP} handleEmail={handleEmail} email={user.email}/>
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
        <h3 className="mb-4 text-xl text-gray-500 font-medium">User Details</h3>
        <UserDetailsForm user={user} setUser={setUser} />
      </div>
    </div>
  );
};

export default SignUpForm;
