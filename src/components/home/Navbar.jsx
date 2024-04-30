import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/logoAsset.png";
import { FaUser, FaBars } from "react-icons/fa";
import { FaCartShopping, FaXmark } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../../redux/slices/cartSlice";
import CartDrawerContent from "@/components/cart/CartDrawerContent";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const totalItems = useSelector(selectTotalItems);
  const {signout,user} = useAuth()
  const navigate = useNavigate();

  if(user && user.user_role){
    if(user.user_role=='restaurant')navigate('/restaurant/dashboard')
    else if(user.user_role=='admin' || user.user_role=='superadmin')navigate('/admin/dashboard')
  }

  const isLinkActive = (path) => {
    return pathname === path;
  };

  const handleUserClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = (e) => {
    signout();
    setShowDropdown(false);
    e.preventDefault();

    // Implement your logout logic here
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCartDrawerToggle = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(currentScrollPos <= 50 || currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <motion.div
      className={`w-full fixed top-0 z-[100] ${
        visible ? "bg-white" : "hidden"
      }`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="hidden lg:flex px-48 py-10 w-full justify-between items-center">
        <Link
          to="/"
          className="flex align-middle items-center gap-2 transition-transform transform hover:scale-110 hover:opacity-80"
        >
          <img src={logo} alt="logo" className="w-16" />
          <h2 className="font-bold text-2xl">Hungrezy</h2>
        </Link>
        <div className="flex items-center lg:gap-10 gap-4">
          <Link
            to="/"
            className={`${
              isLinkActive("/") ? "text-black font-bold" : "text-gray-500"
            } hover:text-amber-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className={`${
              isLinkActive("/restaurants")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-amber-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Restaurants
          </Link>
          <Link
            to="/recipes"
            className={`${
              isLinkActive("/recipes")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-amber-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Recipes
          </Link>
          <Link
            to="/profile"
            className={`${
              isLinkActive("/profile")
                ? "text-black font-bold"
                : "text-gray-500"
            } hover:text-amber-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            Account
          </Link>
          <Link
            to="/about"
            className={`${
              isLinkActive("/about") ? "text-black font-bold" : "text-gray-500"
            } hover:text-amber-500 transition-colors duration-300 hover:scale-110 hover:opacity-80`}
          >
            About
          </Link>
        </div>

        <div className="relative flex lg:gap-4">
          <div
            onClick={handleCartDrawerToggle}
            className="w-fit h-fit border-[1.5px] p-2 rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer"
          >
            <FaCartShopping className="text-2xl text-gray-500" />
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems}
              </div>
            )}
          </div>
          <div
            className={`w-fit h-fit border-[1.5px] ${user&&user.image?'':'p-2'} rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer`}
            onClick={handleUserClick}
          >
           {
            user&& 
              user.image?
                <img src={user.image} className="w-10 h-10 object-cover rounded-full"/>
               :<FaUser className="text-2xl text-gray-500" />
           }
          </div>
          {showDropdown && (
            <div className={`absolute top-12 ${user?'right-24':'right-0'} bg-white border border-gray-400 p-2 w-36 rounded shadow-md flex flex-col items-center`}>
              {
                !user &&
                <Link
                to="/signup"
                className="block py-1 px-4 hover:bg-gray-50 hover:font-semibold text-gray-800 border-b border-gray-300 w-full text-center"
              >
                Sign Up
              </Link>
              }
              {
                !user &&
                <Link
                to="/signin"
                className="block py-1 px-4 hover:font-semibold text-gray-800 border-b hover:bg-gray-50 border-gray-300 w-full text-center"
              >
                Sign In
              </Link>
              }
              {
                user && 
                <button
                onClick={handleLogout}
                className="block py-1 px-4 hover:font-semibold hover:bg-gray-50 text-gray-800 border-gray-300 w-full text-center"
              >
                Logout
              </button>
              }
            </div>
          )}
          {
          user && <h2 className="mt-1.5 text-lg font-semibold text-gray-500">{(user.firstName+" "+user.lastName).replace(/\b\w/g, (char) => char.toUpperCase())}</h2>
          }
        </div>
        
      </div>

      <div className="lg:hidden px-10 py-10 flex justify-between items-center">
        <Link
          to="/"
          className="flex align-middle items-center gap-2 transition-transform transform hover:scale-110 hover:opacity-80"
        >
          <img src={logo} alt="logo" className="w-16" />
          <h2 className="font-bold text-2xl">Hungrezy</h2>
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div
            onClick={handleCartDrawerToggle}
            className="w-fit h-fit border-[1.5px] p-2 rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer"
          >
            <FaCartShopping className="text-2xl text-gray-500" />
            {totalItems > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems}
              </div>
            )}
          </div>
          <div className="relative">
            <div
              className="w-fit h-fit border-[1.5px] p-2 rounded-full border-gray-500 hover:scale-110 transition-transform transform cursor-pointer"
              onClick={handleUserClick}
            >
              <FaUser className="text-2xl text-gray-500" />
            </div>
            {showDropdown && (
              <div className="absolute top-12 right-0 bg-white border border-gray-300 p-2 w-32 rounded shadow-md">
                <Link
                  to="/signup"
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-amber-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  SignUp
                </Link>
                <Link
                  to="/signin"
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-amber-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  SignIn
                </Link>
                <button
                  onClick={handleLogout}
                  className="block py-1 px-4 hover:font-semibold text-gray-800 hover:text-red-500 hover:scale-105 transition-colors duration-300 rounded border-b border-gray-300"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <FaBars
            className="text-3xl cursor-pointer"
            onClick={handleDrawerToggle}
          />
        </div>
      </div>

      {isCartDrawerOpen && (
        <CartDrawerContent
          isDrawerOpen={isDrawerOpen}
          handleCartDrawerToggle={handleCartDrawerToggle}
        />
      )}

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-30 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white h-full w-72 p-4 fixed top-0 left-0"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-end">
              <FaXmark
                className="text-3xl cursor-pointer"
                onClick={handleDrawerToggle}
              />
            </div>
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Link
                to="/"
                className={`${
                  isLinkActive("/") ? "text-black font-bold" : "text-gray-500"
                } hover:text-amber-500 transition-colors duration-300`}
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                className={`${
                  isLinkActive("/restaurants")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-amber-500 transition-colors duration-300`}
              >
                Restaurants
              </Link>
              <Link
                to="/profile"
                className={`${
                  isLinkActive("/profile")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-amber-500 transition-colors duration-300`}
              >
                Account
              </Link>
              <Link
                to="/about"
                className={`${
                  isLinkActive("/about")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-amber-500 transition-colors duration-300`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`${
                  isLinkActive("/contact")
                    ? "text-black font-bold"
                    : "text-gray-500"
                } hover:text-amber-500 transition-colors duration-300`}
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Navbar;
