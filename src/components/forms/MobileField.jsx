

const MobileField = ({signin,handleMobileNumber,mobileNumber,handleSendOTP,setSignInWithOTP}) => {
  return (
    <div>
        <div className="form-floating  mt-3 w-80">
            <input 
              className="form-control focus:shadow-none focus:border-amber-600 rounded-sm" 
              id="mobileNumber"
              placeholder="Enter Mobile Number"
              name="mobileNumber"
              type="number"
              onChange = {(e)=>handleMobileNumber(e)}
              autoFocus
            />
            <label 
              htmlFor="mobileNumber"
              className="text-gray-500"
            >
              Mobile Number
            </label>
        </div>
        {
            signin?
            <div className="flex justify-end mt-1.5">
             <h6 className="text-gray-500 text-sm w-fit hover:cursor-pointer" onClick={()=>setSignInWithOTP(false)}>
               sign in with password?
             </h6>
           </div>:''
        }
          
        <div className="mb-10">
            <button onClick={()=>handleSendOTP(mobileNumber)} className="h-10 mt-6 w-full bg-amber-500 text-white text-md font-semibold hover:bg-amber-600 rounded-none">
              Send OTP
            </button>
        </div>
    </div>

  )
}

export default MobileField
