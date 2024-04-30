import { useState, useRef } from "react";
import { TiTick } from "react-icons/ti";
import {toast} from 'sonner'

const OTPField = ({ handleVerifyOTP }) => {
  const [otp, setOtp] = useState({});
  const d1ref = useRef(null);
  const d2ref = useRef(null);
  const d3ref = useRef(null);
  const d4ref = useRef(null);
  const d5ref = useRef(null);
  const d6ref = useRef(null);

  const handleKeyDown1 = (e) => {
    switch (e.key) {
      case "ArrowRight":
        d2ref.current.focus();
        break;
      default:
        return;
    }
  };

  const handleKeyDown6 = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        d5ref.current.focus();
        break;
      case "Backspace":
        e.preventDefault();
        setOtp({ ...otp, [e.target.name]: "" });
        d5ref.current.focus();
        break;
      default:
        return;
    }
  };

  const handleKeyDown2to5 = (e, ref1, ref2) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowRight":
        ref2.current.focus();
        break;
      case "ArrowLeft":
        ref1.current.focus();
        break;
      case "Backspace":
        e.preventDefault();
        setOtp({ ...otp, [e.target.name]: "" });
        ref1.current.focus();
        break;
      default:
        return;
    }
  };

  const handleDigit = (e, ref) => {
    if (e.target.value != "") ref.current.focus();
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  const handleDigit6 = (e) => {
    setOtp({ ...otp, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!otp || !otp.d1 || !otp.d2 || !otp.d3 || !otp.d4 || !otp.d5 || !otp.d6) {
      toast.warning('Please enter the verification code !');
      return;
    }
  
    const otpString = `${otp.d1}${otp.d2}${otp.d3}${otp.d4}${otp.d5}${otp.d6}`;
    handleVerifyOTP(otpString);
  };
  

  return (
    <div>
      <OTPMsg />
      <div className="mt-8">
        <h5 className="text-lg text-gray-500 ml-1">Enter Your 6-digit OTP</h5>
        <div className="flex flex-row mt-6">
          <input
            value={otp.d1}
            autoFocus
            onKeyDown={(e) => handleKeyDown1(e)}
            onChange={(e) => handleDigit(e, d2ref)}
            ref={d1ref}
            name="d1"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
          <input
            value={otp.d2}
            onKeyDown={(e) => handleKeyDown2to5(e, d1ref, d3ref)}
            onChange={(e) => handleDigit(e, d3ref)}
            ref={d2ref}
            name="d2"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
          <input
            value={otp.d3}
            onKeyDown={(e) => handleKeyDown2to5(e, d2ref, d4ref)}
            onChange={(e) => handleDigit(e, d4ref)}
            ref={d3ref}
            name="d3"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
          <input
            value={otp.d4}
            onKeyDown={(e) => handleKeyDown2to5(e, d3ref, d5ref)}
            onChange={(e) => handleDigit(e, d5ref)}
            ref={d4ref}
            name="d4"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
          <input
            value={otp.d5}
            onKeyDown={(e) => handleKeyDown2to5(e, d4ref, d6ref)}
            onChange={(e) => handleDigit(e, d6ref)}
            ref={d5ref}
            name="d5"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
          <input
            value={otp.d6}
            onKeyDown={(e) => handleKeyDown6(e)}
            onChange={(e) => handleDigit6(e)}
            ref={d6ref}
            name="d6"
            maxLength={1}
            className="form-control w-12 h-12 focus:shadow-none focus:border-amber-600 rounded-sm mx-1 text-center"
          />
        </div>
        <div>
          <button
            onClick={() => handleSubmit()}
            className="h-10 mt-10 w-[21rem] bg-amber-500 text-white text-md font-semibold hover:bg-amber-600 rounded-none"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPField;

const OTPMsg = () => {
  return (
    <div className="flex flex-row items-center">
      <TiTick className="text-3xl text-green-800" />
      <h3 className="text-xl font-bold text-green-800">
        OTP sent successfully!
      </h3>
    </div>
  );
};
