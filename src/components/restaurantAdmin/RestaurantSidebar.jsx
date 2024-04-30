import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronUp, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import MenuLink from "./Dashboard/MenuLink";
import { GrOrderedList } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { RiPlayListAddFill } from "react-icons/ri";
import {
  MdOutlineEditNote,
  MdOutlineMenuBook,
  MdReviews,
} from "react-icons/md";
import BlinkingDot from "./BlinkingDot";
import { useAuth } from "../../AuthContext";

const RestaurantSidebar = () => {
  const [newOrders, setNewOrders] = useState(0);
  const { signout, user, accessToken } = useAuth();
  const navigate = useNavigate();
  if (!user) navigate("/restaurant/signin");

  const { pathname } = useLocation();
  const isLinkActive = (path) => {
    return pathname.startsWith(path);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    fetchRestaurantOrders(user._id, "placed");
  }, []);

  console.log(newOrders);

  const fetchRestaurantOrders = async (restaurantId, status) => {
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/order/restaurant/${restaurantId}?status=${status}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("Failed to fetch orders");
        return [];
      }
      const result = await response.json();
      setNewOrders(result.data.length);
      if (!result.data) return [];
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border-r left-0 w-[17.5rem] h-[70vh] overflow-y-auto p-3 lg:flex flex-col gap-y-2 none hidden">
        <Link to="dashboard">
          <div
            className={`${
              isLinkActive("/restaurant/dashboard")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <LuLayoutDashboard size={24} />
            <span className="text-base">Dashboard</span>
          </div>
        </Link>

        <Link to="orders">
          <div
            className={`${
              isLinkActive("/restaurant/orders")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <GrOrderedList size={24} />
            <span className="text-base">Orders</span>
            {newOrders > 0 && <BlinkingDot newOrders={newOrders} />}
          </div>
        </Link>

        <div onClick={toggleMenu}>
          <div
            className={`${
              isMenuOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <MdOutlineMenuBook size={24} />
            <span className="text-base">Menu</span>
            {isMenuOpen ? (
              <FaChevronUp
                className="ml-auto text-lg transition duration-300"
                color={isMenuOpen ? "#f97316" : "#9ca3af"}
                size={12}
              />
            ) : (
              <FaChevronUp
                color={isMenuOpen ? "#f97316" : "#9ca3af"}
                size={12}
                className="ml-auto text-lg transform rotate-180 transition duration-300"
              />
            )}
          </div>
        </div>

        {isMenuOpen && (
          <>
            <div className="ml-8 transition duration-300 transform">
              <MenuLink
                isMenuOpen={isLinkActive("/restaurant/menu")}
                to="menu"
                icon={<CiViewList size={20} />}
                text="Menu List"
              />
              <MenuLink
                to="add-menu"
                isMenuOpen={isLinkActive("/restaurant/add-menu")}
                icon={<RiPlayListAddFill size={20} />}
                text="Add Menu"
              />
              {isLinkActive("/restaurant/edit-menu") && (
                <MenuLink
                  to="edit-menu"
                  isMenuOpen={isLinkActive("/restaurant/edit-menu")}
                  icon={<MdOutlineEditNote size={20} />}
                  text="Edit Menu"
                />
              )}
            </div>
          </>
        )}

        <Link to="reviews">
          <div
            className={`${
              isLinkActive("/restaurant/reviews")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <MdReviews size={24} />
            <span className="text-base">Reviews</span>
          </div>
        </Link>
      </div>

      <div className="border-r left-0 w-[17.5rem] h-[16vh] p-3 lg:flex flex-col gap-y-2 hidden">
        <Link to="profile">
          <div
            className={`${
              isLinkActive("/restaurant/profile")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <FaRegUser size={24} />
            <span className="text-base">Profile</span>
          </div>
        </Link>
        <div
          to="profile"
          onClick={() => {
            signout();
            window.location.reload();
          }}
        >
          <div
            className={`hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <IoLogOutOutline className="text-red-400" size={24} />
            <span className="text-base text-red-400">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantSidebar;
