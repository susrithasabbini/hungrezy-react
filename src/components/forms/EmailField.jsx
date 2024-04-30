

const EmailField = ({signin,handleEmail,email,handleSendOTP,setSignInWithOTP}) => {
    return (
      <div>
          <div className="form-floating  mt-3 w-80">
              <input 
                className="form-control focus:shadow-none focus:border-amber-600 rounded-sm" 
                id="email"
                placeholder="Enter Mobile Number"
                name="email"
                type="email"
                onChange = {(e)=>handleEmail(e)}
                autoFocus
              />
              <label 
                htmlFor="email"
                className="text-gray-500"
              >
                Email
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
              <button onClick={()=>handleSendOTP(email)} className="h-10 mt-6 w-full bg-amber-500 text-white text-md font-semibold hover:bg-amber-600 rounded-none">
                Send OTP
              </button>
          </div>
      </div>
  
    )
  }
  
  export default EmailField
  