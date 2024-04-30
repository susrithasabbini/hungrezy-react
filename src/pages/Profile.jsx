import React, { useState, useEffect } from "react";
import { RiUserFill } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import OrdersList from "@/components/profile/OrdersList";
import TableBookings from "@/components/profile/TableBookings";
import Account from "@/components/profile/Account";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import { useAuth } from "../AuthContext";

const Profile = () => {
  const [scrolling, setScrolling] = useState(false);
  const [activeTab, setActiveTab] = useState("orders"); // Default active tab
  const navigate = useNavigate();
  //const currentUser = useSelector(selectUser);
  const {user,loading} = useAuth()
  console.log(user);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    if(!loading && !user)navigate('/signin')
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  if(!loading && !user)navigate('/signin')
 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersList />;
      // case "bookings":
      //   return <TableBookings />;
      case "account":
        return <Account user={user} />;
      // case "address":
      //   return <p>Address Book content goes here.</p>;
      case "help":
        return <p>Help content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div
      className={`${
        scrolling ? "bg-white" : "bg-orange-300"
      } transition-all duration-300 mt-32`}
    >
      <div className="container mx-auto p-4">
        {!scrolling && user && (
          <div className="flex flex-col items-center my-4 lg:flex-row">
            <div>
              {
                user && user.image && <img src={user.image} className="w-24 h-24 object-cover rounded-full"/>
              }
            </div>
            <div className="text-4xl font-bold ml-4 text-white mb-3 lg:mb-0 lg:mr-6">
              {user.firstName + " " + user.lastName}
            </div>
            <div className="text-white">
              <div className="font-bold text-base">
                {user.mobileNumber}
              </div>
              <div className="text-lg">{user.email}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row bg-white rounded-3xl">
          <div className="w-[80%] lg:w-[30%] ml-5 my-5 bg-orange-300 rounded-3xl opacity-80 pt-4 pl-5 lg:sticky lg:top-20 lg:h-[80vh]">
            <div>
              <ul className="">
                <li
                  className={`mb-2 cursor-pointer w-full py-4 pl-3 font-bold text-lg ${
                    activeTab === "orders" ? "bg-white rounded-l-3xl" : ""
                  }`}
                  onClick={() => handleTabClick("orders")}
                >
                  <div className="flex items-center w-full">
                    <BiSolidShoppingBags className="mr-3 text-2xl" />
                    Your Orders
                  </div>
                </li>
                {/* <li
                  className={`mb-2 cursor-pointer w-full py-6 px-3 font-bold  text-lg ${
                    activeTab === "bookings" ? "bg-white rounded-l-3xl" : ""
                  }`}
                  onClick={() => handleTabClick("bookings")}
                >
                  <div className="flex items-center">
                    <MdRestaurantMenu className="mr-3 text-2xl" />
                    Table Bookings
                  </div>
                </li> */}
                <li
                  className={`mb-2 cursor-pointer w-full py-6 px-3 font-bold  text-lg ${
                    activeTab === "account" ? "bg-white rounded-l-3xl" : ""
                  }`}
                  onClick={() => handleTabClick("account")}
                >
                  <div className="flex items-center">
                    <FaUserCircle className="mr-3 text-2xl" />
                    Account
                  </div>
                </li>
                {/* <li
                  className={`mb-2 cursor-pointer w-full py-6 px-3 font-bold  text-lg ${
                    activeTab === "address" ? "bg-white rounded-l-3xl" : ""
                  }`}
                  onClick={() => handleTabClick("address")}
                >
                  <div className="flex items-center">
                    <FaAddressBook className="mr-3 text-2xl" />
                    Address Book
                  </div>
                </li> */}
                <li
                  className={`mb-2 cursor-pointer w-full py-6 px-3 font-bold  text-lg ${
                    activeTab === "help" ? "bg-whit rounded-l-3xl" : ""
                  }`}
                  onClick={() => navigate("/contact")}
                >
                  <div className="flex items-center">
                    <RiCustomerService2Fill className="mr-3 text-2xl" />
                    Contact Us
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-5/6 p-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
