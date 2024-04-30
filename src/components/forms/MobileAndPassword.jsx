import { useState } from "react"
import {useDispatch } from 'react-redux';
import { setCurrentUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const MobileAndPassword = ({setSignInWithOTP,mobileNumber,handleMobileNumber}) => {
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handlePasswordChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Perform validation checks here
    if (!mobileNumber || !password) {
      setError("Mobile number and password are required.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_HUNGREZY_API}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Successful sign-in, handle the response accordingly
        dispatch(setCurrentUser(data.user));
        navigate(-1);
        console.log("User successfully signed in:", data.user);
      } else {
        // Handle non-successful response, e.g., show an error message
        setError(data.error || "Sign-in failed.");
      }
    } catch (error) {
      console.error("Error during sign-in request:", error);
      setError("Network error");
    }
  };

  return (
    <div className="w-80 ">
        <Heading/>
        <div className="form-floating mb-3 mt-3">
          <input 
            className="form-control focus:shadow-none focus:border-amber-600 rounded-sm" 
            id="mobileNumber"
            placeholder="Enter Mobile Number"
            name="mobileNumber"
            type="tel"
            value={mobileNumber}
            onChange={(e)=>handleMobileNumber(e)}
            autoFocus
          />
          <label 
            htmlFor="mobileNumber"
            className="text-gray-500"
          >
            Mobile Number
          </label>
        </div>

        <div className="form-floating mt-3">
          <input
            className="form-control focus:shadow-none focus:border-amber-600 rounded-sm" 
            id="password" 
            placeholder="Enter Password" 
            name="password"
            type="password"
            value={password}
            onChange={(e)=>handlePasswordChange(e)} 
          />
          <label 
            htmlFor="password"
            className="text-gray-500"
          >
            Password
          </label>
        </div>
        <div className="flex justify-end mt-1">
          <h6 className="text-gray-500 text-sm w-fit hover:cursor-pointer hover:text-gray-400" onClick={()=>setSignInWithOTP(true)}>
            sign in with OTP?
          </h6>
        </div>
        <div className="mt-6">
          <button onClick={handleSignIn} className="h-10 w-full bg-amber-500 text-white text-md font-semibold hover:bg-amber-600 rounded-none">
            Sign in
          </button>
        </div>
        <div className="mt-16 flex flex-row ">
          <h6 className="text-gray-500 font-medium text-sm w-fit hover:cursor-pointer hover:text-gray-400">
            New to Hungrezy? create an account
          </h6>
        </div>
    </div>
  )
}

export default MobileAndPassword


const Heading = ()=>{

  return(
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-3"><span className="text-green-800">Hun</span><span className="text-amber-500">Grezy</span></h1>
      <h4 className="text-lg font-medium text-gray-500">Welcome back!</h4>
    </div>
  )
}
