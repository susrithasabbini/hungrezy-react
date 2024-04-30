import { useState} from "react"
import OTPField from "./OTPField"
import MobileField from "./MobileField"
import {useDispatch } from 'react-redux';
import { setCurrentUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";


const MobileAndOTP = ({mobileNumber,handleMobileNumber,setSignInWithOTP}) => {
  const [showOTP,setShowOTP] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  async function handleSendOTP() {

    const url = `${import.meta.env.VITE_HUNGREZY_API}/auth/sendOTP`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers based on your server requirements
        },
        body: JSON.stringify({ mobileNumber }),
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        console.error('Error:', response.status, response.statusText);
        return null;
      }
  
      // Parse and return the response JSON
      const data = await response.json();
      console.log('Response:', data);
      setShowOTP(true)
      return data;
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error.message);
      return null;
    }
  }
  
  // Function to check if a user with the given mobile number exists
  async function checkUserExists(mobileNumber) {
    const url = `${import.meta.env.VITE_HUNGREZY_API}/auth/checkUser/${mobileNumber}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers based on your server requirements
        },
    
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        console.error('Error checking user:', response.status, response.statusText);
        return false;
      }
  
      // Parse and return the response JSON
      const data = await response.json();
      console.log('User exists:', data);
      return data.user;
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error checking user:', error.message);
      return false;
    }
  }
  

  const handleVerifyOTP = async(OTP) => {
     // First, check if the user with the given mobile number exists
     const userExists = await checkUserExists(mobileNumber);
  
     if (!userExists) {
       console.error('User not found');
       // Handle the case where the user does not exist
       return null;
     }
     
     dispatch(setCurrentUser(userExists));
    const url = `${import.meta.env.VITE_HUNGREZY_API}/auth/verifyOTP`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // You may need to include additional headers based on your server requirements
        },
        body: JSON.stringify({OTP,mobileNumber}),
      });
  
      if (!response.ok) {
        // Handle non-successful responses here
        console.error('Error:', response.status, response.statusText);
        return null;
      }
  
      // Parse and return the response JSON
      const data = await response.json();
      navigate(-1);
      console.log('Response:', data);
      return data;
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error.message);
      return null;
    }
  };
  
  return (
    <div className="w-80">
      
      {
        showOTP?
        <OTPField handleVerifyOTP={handleVerifyOTP}/>:
        <div>
          <Heading/>
          <MobileField handleMobileNumber={handleMobileNumber} signin={true} handleSendOTP={handleSendOTP} setSignInWithOTP={setSignInWithOTP}/>
        </div>
      }
        
    </div>
  )
}

export default MobileAndOTP


const Heading = ()=>{

  return(
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-3"><span className="text-green-800">Hun</span><span className="text-amber-500">Grezy</span></h1>
      <h4 className="text-lg font-medium text-gray-500">Welcome back!</h4>
    </div>
  )
}


