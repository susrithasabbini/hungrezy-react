import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { useRef, useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { FiSave } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../../../AuthContext";
import {toast} from 'sonner';

const EditMenu = () => {
  const formVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };
  const image = useRef(null);
  const restaurantName = "Pista House";
  const restaurantEmail = "pistahouse@gmail.com";
  const [area, setArea] = useState("Hitech City");
  const [city, setCity] = useState("Hyderabad");
  const [address, setAddress] = useState("Hitech City, Hyderabad");
  const [pincode, setPinCodde] = useState("500081");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const {user,accessToken,signin} = useAuth()
  

  const handleProfileSubmit = async(e) => {
    e.preventDefault();
    console.log({ area, city, address, pincode });
    try{
      const url = `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/${user._id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({area,city,address}),
      });
      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message)
        return ;
      }
      toast.success(result.message)
      signin(result.data,accessToken)
    }catch(error){
      toast.error('Please try again later!')
      console.error('Error:', error);
    }
  };

  const handleImageChange = async(e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/${user._id}/upload/image`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include authorization token if needed
        },
        body: formData, // Set the FormData object as the body
      });
      if (!response.ok) {
        toast.error('Failed to upload image');
        return;
      }
      toast.success('Image uploaded successfully');
      // Handle success
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Please try again later!');
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log({ currentPassword, newPassword });
  };

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    console.log({ password });
  };

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Profile</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Profile</p>
        </div>
      </div>
      <div className="h-fit flex flex-row w-full gap-x-10 border-b">
        <div
          onClick={() => image.current.click()}
          className="w-[13rem] cursor-pointer h-[13rem] my-20 object-cover rounded-full bg-orange-100 border-dotted border-2 border-orange-500 flex items-center justify-center"
        >
          <input
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            ref={image}
            onChange={handleImageChange}
          />
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="restaurant"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <p className="text-center text-orange-500 text-sm mt-2 flex flex-col justify-center items-center gap-y-3">
              <LuUploadCloud className="w-10 h-10" />
              <span className="block">Upload Image</span>
            </p>
          )}
        </div>

        <form className="flex flex-col w-[50rem] gap-4 pb-20">
          <motion.div
            variants={formVariants}
            className="flex flex-col form-floating mt-2 gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="restaurantName"
                  placeholder="Restaurant Name"
                  name="restaurantName"
                  type="text"
                  value={user && user.name}
                  disabled
                />
                <label htmlFor="restaurantName" className="text-gray-500">
                  Restaurant Name
                </label>
              </div>

              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="restaurantEmail"
                  placeholder="Restaurant Email"
                  name="restaurantEmail"
                  type="email"
                  value={user && user.email}
                  disabled
                />
                <label htmlFor="restaurantEmail" className="text-gray-500">
                  Restaurant Email
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="area"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                ></input>
                <label htmlFor="area">Area</label>
              </div>

              <div className="form-floating">
                <select
                  className={`form-select focus:shadow-none focus:border-amber-600 rounded-md w-full h-full cursor-pointer `}
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Kolkata">Kolkata</option>
                </select>
                <label htmlFor="city">City</label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="form-floating">
                <textarea
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="restaurantAddress"
                  placeholder="Restaurant Address"
                  name="restaurantAddress"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ height: "100px" }}
                />
                <label htmlFor="restaurantAddress" className="text-gray-500">
                  Restaurant Address
                </label>
              </div>

              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="restaurantPincode"
                  placeholder="Restaurant Pincode"
                  name="restaurantPincode"
                  type="number"
                  value={pincode}
                  onChange={(e) => setPinCodde(e.target.value)}
                />
                <label htmlFor="restaurantPincode" className="text-gray-500">
                  Restaurant Pincode
                </label>
              </div>
            </div>
          </motion.div>
          <div className="flex items-center justify-center gap-x-20">
            <motion.button
              onClick={handleProfileSubmit}
              type="submit"
              className="py-2 px-4 bg-amber-500 w-fit self-center hover:bg-amber-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
            >
              <span className="align-baseline text-center">Save Changes</span>
              <FiSave className="ml-2 align-baseline" />
            </motion.button>
          </div>
        </form>
      </div>

      {/**Change Password */}
      <div className="h-fit w-full gap-x-10 border-b">
        <h1 className="text-xl font-medium my-4">Change Password</h1>
        <form className="flex flex-col gap-4 pb-20">
          <motion.div
            variants={formVariants}
            className="flex flex-col form-floating mt-2 gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="currentPassword"
                  placeholder="Current Password"
                  name="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <label htmlFor="currentPassword" className="text-gray-500">
                  Current Password
                </label>
              </div>

              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="newPassword"
                  placeholder="New Password"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <label htmlFor="newPassword" className="text-gray-500">
                  New Password
                </label>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-x-20">
            <motion.button
              type="button"
              className="py-2 px-4 bg-amber-500 w-fit self-center hover:bg-amber-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
              onClick={handlePasswordChange}
            >
              <span className="align-baseline text-center">Change</span>
              <FiSave className="ml-2 align-baseline" />
            </motion.button>
          </div>
        </form>
      </div>

      {/**Delete Account */}
      <div className="h-fit w-full gap-x-10">
        <h1 className="text-xl font-medium my-4">Delete Account</h1>
        <form className="flex flex-col gap-4 pb-20">
          <motion.div
            variants={formVariants}
            className="flex flex-col form-floating mt-2 gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full`}
                  id="password"
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password" className="text-gray-500">
                  Current Password
                </label>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-x-20">
            <motion.button
              type="button"
              onClick={handleDeleteAccount}
              className="py-2 px-4 bg-red-500 w-fit self-center hover:bg-red-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
            >
              <span className="align-baseline text-center">Delete</span>
              <MdOutlineDelete className="ml-2 align-baseline" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
