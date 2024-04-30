import { useState} from "react"
import OTPField from "./OTPField"
import EmailField from "./EmailField"
import { toast } from 'sonner'
import { useLocation ,useNavigate } from 'react-router-dom';
import { useAuth } from "../../AuthContext";

const EmailAndOTP = ({email,handleEmail,setSignInWithOTP,validateEmail}) => {
    const [showOTP,setShowOTP] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const {signin} = useAuth();
    let user_role;
    if(location.pathname=='/admin/signin')user_role="admin"
    if(location.pathname=='/restaurant/signin')user_role="restaurant"
    else user_role="user"

    const handleVerifyOTP = async(verificationCode)=>{
      try{
        const response = await fetch(`${import.meta.env.VITE_HUNGREZY_API}/api/auth//signin-otp/verify-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, user_role,verificationCode }),
        });
        const result = await response.json()
        if(!response.ok){
          const error = result.message;
          toast.error(error);
          return;
        }
        const {user,accessToken} = result.data
        signin(user,accessToken);
        if(user_role=='admin')navigate('/admin/dashboard');
        if(user_role=='restaurant')navigate('/restaurant/dashboard');
        if(user_role=='user')navigate(-1);
      }catch(error){
        console.log(error);
        toast.error("Something went wrong.Please try again!");
      }
    }

    const handleSendOTP = async()=>{
      if(!validateEmail(email))return;
      try{
        const response = await fetch(`${import.meta.env.VITE_HUNGREZY_API}/api/auth//signin-otp/send-verification-code`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, user_role }),
        });
        const result = await response.json()
        if(!response.ok){
          const error = result.message;
          toast.error(error);
          return;
        }
        setShowOTP(true)
      }catch(error){
        console.log(error);
        toast.error("Something went wrong.Please try again!");
      }
      
    }


  return (
    <div className="w-80">
      
      {
        showOTP?
        <OTPField handleVerifyOTP={handleVerifyOTP}/>:
        <div>
          <Heading/>
          <EmailField
           handleEmail={handleEmail}
           signin={true}
           handleSendOTP={handleSendOTP} 
           setSignInWithOTP={setSignInWithOTP}
           validateEmail={validateEmail}
           />
        </div>
      }
        
    </div>
  )
}

export default EmailAndOTP

const Heading = ()=>{

    return(
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3"><span className="text-green-800">Hun</span><span className="text-amber-500">Grezy</span></h1>
        <h4 className="text-lg font-medium text-gray-500">Welcome back!</h4>
      </div>
    )
  }
