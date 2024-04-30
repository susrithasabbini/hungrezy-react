import { useState } from "react";
import EmailAndPassword from "@/components/forms/EmailAndPassword";
import EmailAndOTP from "@/components/forms/EmailAndOTP";
import {toast} from 'sonner';

const EmailSigninForm = () => {
  const [signInWithOTP, setSignInWithOTP] = useState(false);
  const [email, setEmail] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      {signInWithOTP ? (
        <EmailAndOTP
          email={email}
          handleEmail={handleEmail}
          setSignInWithOTP={setSignInWithOTP}
          validateEmail={validateEmail}
        />
      ) : (
        <EmailAndPassword
          setSignInWithOTP={setSignInWithOTP}
          email={email}
          handleEmail={handleEmail}
          validateEmail={validateEmail}
        />
      )}
    </div>
  );
};


export default EmailSigninForm;
