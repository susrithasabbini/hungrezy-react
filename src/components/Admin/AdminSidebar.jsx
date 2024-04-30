import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";
import { FaChevronUp, FaRegQuestionCircle, FaRegUser } from "react-icons/fa";
import { IoLogOutOutline, IoRestaurantOutline } from "react-icons/io5";
import { useState } from "react";
import RestaurantLink from "./Sidebar/RestaurantLink";
import { CiViewList } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import CustomerLink from "./Sidebar/CustomerLink";
import AdminLink from "./Sidebar/AdminLink";
import { useAuth } from "../../AuthContext";

const AdminSidebar = () => {
  const { pathname } = useLocation();
  const [isCustomerOpen, setMenuOpen] = useState(false);
  const [isRestaurantOpen, setRestaurantOpen] = useState(false);
  const [isAdminOpen, setAdminOpen] = useState(false);
  const { signout, user } = useAuth();
  // const navigate = useNavigate();
  // if (!user) navigate("/admin/signin");

  const isLinkActive = (path) => {
    if (path.includes("/:id")) {
      return (
        pathname.startsWith(path.split("/:id")[0]) &&
        pathname !== path.split("/:id")[0]
      );
    } else {
      return pathname === path;
    }
  };

  const toggleCustomer = () => {
    setMenuOpen(!isCustomerOpen);
  };

  const toggleRestaurant = () => {
    setRestaurantOpen(!isRestaurantOpen);
  };

  const toggleAdmin = () => {
    setAdminOpen(!isAdminOpen);
  };

  return (
    <>
      <div className="border-r left-0 w-[17.5rem] h-[70vh] overflow-y-auto p-3 lg:flex flex-col gap-y-2 none hidden">
        <Link to="dashboard">
          <div
            className={`${
              isLinkActive("/admin/dashboard")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <LuLayoutDashboard size={24} />
            <span className="text-base">Dashboard</span>
          </div>
        </Link>

        <div onClick={toggleCustomer}>
          <div
            className={`${
              isCustomerOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <FaRegUser size={24} />
            <span className="text-base">Customers</span>
            {isCustomerOpen ? (
              <FaChevronUp
                className="ml-auto text-lg transition duration-300"
                color={isCustomerOpen ? "#f97316" : "#9ca3af"}
                size={12}
              />
            ) : (
              <FaChevronUp
                color={isCustomerOpen ? "#f97316" : "#9ca3af"}
                size={12}
                className="ml-auto text-lg transform rotate-180 transition duration-300"
              />
            )}
          </div>
        </div>

        {isCustomerOpen && (
          <>
            <div className="ml-8 transition duration-300 transform">
              <CustomerLink
                isCustomerOpen={isLinkActive("/admin/customers")}
                to="customers"
                icon={<CiViewList size={20} />}
                text="Customers List"
              />
              {isLinkActive("/admin/customers/:id") && (
                <CustomerLink
                  isCustomerOpen={isLinkActive("/admin/customers/:id")}
                  icon={<CgDetailsMore size={20} />}
                  text="Customer Details"
                />
              )}
            </div>
          </>
        )}

        <div onClick={toggleRestaurant}>
          <div
            className={`${
              isRestaurantOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <IoRestaurantOutline size={24} />
            <span className="text-base">Restaurants</span>
            {isRestaurantOpen ? (
              <FaChevronUp
                className="ml-auto text-lg transition duration-300"
                color={isRestaurantOpen ? "#f97316" : "#9ca3af"}
                size={12}
              />
            ) : (
              <FaChevronUp
                color={isRestaurantOpen ? "#f97316" : "#9ca3af"}
                size={12}
                className="ml-auto text-lg transform rotate-180 transition duration-300"
              />
            )}
          </div>
        </div>

        {isRestaurantOpen && (
          <>
            <div className="ml-8 transition duration-300 transform">
              <RestaurantLink
                isRestaurantOpen={isLinkActive("/admin/restaurants")}
                to="restaurants"
                icon={<CiViewList size={20} />}
                text="Restaurants List"
              />
              {isLinkActive("/admin/restaurants/:id") && (
                <RestaurantLink
                  isRestaurantOpen={isLinkActive("/admin/restaurants/:id")}
                  icon={<CgDetailsMore size={20} />}
                  text="Restaurant Details"
                />
              )}
            </div>
          </>
        )}

        {user.superAdmin && (
          <div onClick={toggleAdmin}>
            <div
              className={`${
                isAdminOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
              } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
            >
              <FaRegUser size={24} />
              <span className="text-base">Admins</span>
              {isAdminOpen ? (
                <FaChevronUp
                  className="ml-auto text-lg transition duration-300"
                  color={isAdminOpen ? "#f97316" : "#9ca3af"}
                  size={12}
                />
              ) : (
                <FaChevronUp
                  color={isAdminOpen ? "#f97316" : "#9ca3af"}
                  size={12}
                  className="ml-auto text-lg transform rotate-180 transition duration-300"
                />
              )}
            </div>
          </div>
        )}

        {isAdminOpen && (
          <>
            <div className="ml-8 transition duration-300 transform">
              <AdminLink
                isAdminOpen={isLinkActive("/admin/admins")}
                to="admins"
                icon={<CiViewList size={20} />}
                text="Admins List"
              />
              {isLinkActive("/admin/customers/:id") && (
                <AdminLink
                  isCustomerOpen={isLinkActive("/admin/customers/:id")}
                  icon={<CgDetailsMore size={20} />}
                  text="Admin Details"
                />
              )}
            </div>
          </>
        )}

        <Link to="reviews">
          <div
            className={`${
              isLinkActive("/admin/reviews")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <MdOutlineRateReview size={24} />
            <span className="text-base">Reviews</span>
          </div>
        </Link>

        <Link to="queries">
          <div
            className={`${
              isLinkActive("/admin/queries")
                ? "text-orange-500 bg-orange-50"
                : "text-gray-500"
            } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
          >
            <FaRegQuestionCircle size={24} />
            <span className="text-base">Queries</span>
          </div>
        </Link>
      </div>

      <div className="border-r left-0 w-[17.5rem] h-[16vh] p-3 lg:flex flex-col gap-y-2 hidden">
        <div
          onClick={() => {
            signout();
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

export default AdminSidebar;
