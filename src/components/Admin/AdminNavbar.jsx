import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/logoAsset.png";
import {
  FaBars,
  FaChevronUp,
  FaRegQuestionCircle,
  FaRegUser,
  FaSearch,
} from "react-icons/fa";
import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { FaUser, FaXmark } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLogOutOutline, IoRestaurantOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { MdOutlineRateReview } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import RestaurantLink from "./Sidebar/RestaurantLink";
import { CgDetailsMore } from "react-icons/cg";
import CustomerLink from "./Sidebar/CustomerLink";
import { useAuth } from "../../AuthContext";
import { toast } from "sonner";
import { Select, SelectItem } from "@tremor/react";
import useWebSocket from "../../hooks/useWebsocket";

const AdminNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { signout, user } = useAuth();
  const [announcement, setAnnouncement] = useState("");
  const [to, setTo] = useState("all");
  const { socket, sendMessage } = useWebSocket();

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

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const [isCustomerOpen, setMenuOpen] = useState(false);
  const [isRestaurantOpen, setRestaurantOpen] = useState(false);

  const toggleCustomer = () => {
    setMenuOpen(!isCustomerOpen);
  };

  const toggleRestaurant = () => {
    setRestaurantOpen(!isRestaurantOpen);
  };

  const handlePostAnnouncement = async () => {
    if (!announcement.trim()) {
      toast.warning("Please enter an announcement");
      return;
    }

    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/admin/announce`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcement, to }),
      }
    );
    const result = await response.json();
    if (socket) {
      sendMessage({
        type: "announcement",
        payload: result.data,
      });
    }
    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      return;
    }
    toast.success("Announcement posted successfully");
    setAnnouncement("");
  };

  return (
    <div>
      <div className="hidden lg:flex px-4 w-full justify-between items-center border-b">
        <div className="w-[16rem] border-r pl-3">
          <Link
            to="/"
            className="flex items-center gap-2 transition-transform transform hover:opacity-80"
          >
            <img src={logo} alt="logo" className="w-16 py-3" />
            <h2 className="font-bold text-2xl">Hungrezy</h2>
          </Link>
        </div>
        <div className="flex-[11] flex justify-end items-center w-full ml-10">
          <div className="flex gap-x-4 items-center">
            <Popover>
              <PopoverTrigger>
                <Button
                  size="md"
                  rounded={"full"}
                  leftIcon={<TfiAnnouncement className="h-6 w-6" />}
                  colorScheme="gray"
                  backgroundColor={"gray.200"}
                ></Button>
              </PopoverTrigger>
              <PopoverContent height={"28rem"}>
                <PopoverArrow />
                <PopoverHeader>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-500 pt-3">
                      To: &nbsp;
                    </p>
                    <Select
                      className="w-[10rem]"
                      defaultValue="all"
                      value={to}
                      onValueChange={setTo}
                    >
                      <SelectItem
                        value="all"
                        className="cursor-pointer"
                        defaultChecked
                      >
                        All
                      </SelectItem>
                    </Select>
                  </div>
                </PopoverHeader>
                <PopoverBody>
                  <div className="form-floating my-3">
                    <textarea
                      onChange={(e) => setAnnouncement(e.target.value)}
                      className="form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full"
                      id="announcement"
                      placeholder="Write an announcement..."
                      name="announcement"
                      style={{ height: "270px", maxHeight: "270px" }}
                      value={announcement}
                    />
                    <label htmlFor="announcment" className="text-gray-500">
                      Write an announcement...
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-x-20">
                    <button
                      type="button"
                      onClick={handlePostAnnouncement}
                      className="py-2 px-4 bg-orange-400 w-fit self-center hover:bg-orange-500 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
                    >
                      Post
                    </button>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaUser color="gray" className="w-6 h-6" />}
                variant="outline"
                className="bg-gray-200"
                borderRadius={"50%"}
                size={"lg"}
              />
              <MenuList>
                <MenuItem
                  className="flex gap-[10px] items-center"
                  _hover={{ backgroundColor: "red.50" }}
                  onClick={() => {
                    signout();
                  }}
                >
                  <Icon color={"red.400"} as={IoLogOutOutline} w={5} h={5} />
                  <p className="text-red-400">Log Out</p>
                </MenuItem>
              </MenuList>
            </Menu>
            <div className="py-2">
              <p className="text-base font-semibold">
                {(user.firstName + " " + user.lastName).replace(
                  /\b\w/g,
                  (char) => char.toUpperCase()
                )}
              </p>
              <p className="text-sm font-normal">
                {user.superAdmin ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden px-4 md:px-10 py-10 flex justify-between items-center sm:gap-x-6">
        <Link
          to="/"
          className="flex align-middle items-center gap-2 transition-transform transform hover:scale-110 hover:opacity-80"
        >
          <img src={logo} alt="logo" className="sm:w-16 w-8" />
          <h2 className="font-bold sm:text-2xl text-base">Hungrezy</h2>
        </Link>

        <div className="flex items-center justify-between gap-3">
          <div className="relative flex gap-x-3 items-center">
            <Popover>
              <PopoverTrigger>
                <Button
                  size="md"
                  rounded={"full"}
                  leftIcon={<TfiAnnouncement className="h-6 w-6" />}
                  colorScheme="gray"
                  backgroundColor={"gray.200"}
                ></Button>
              </PopoverTrigger>
              <PopoverContent height={"28rem"}>
                <PopoverArrow />
                <PopoverHeader>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-500 pt-3">
                      To: &nbsp;
                    </p>
                    <Select
                      className="w-[10rem]"
                      defaultValue="all"
                      value={to}
                      onValueChange={setTo}
                    >
                      <SelectItem
                        value="all"
                        className="cursor-pointer"
                        defaultChecked
                      >
                        All
                      </SelectItem>
                      <SelectItem value="customers" className="cursor-pointer">
                        Customers
                      </SelectItem>
                      <SelectItem
                        value="restaurants"
                        className="cursor-pointer"
                      >
                        Restaurants
                      </SelectItem>
                    </Select>
                  </div>
                </PopoverHeader>
                <PopoverBody>
                  <div className="form-floating my-3">
                    <textarea
                      className="form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full"
                      id="announcement"
                      placeholder="Write an announcement..."
                      name="announcement"
                      style={{ height: "270px", maxHeight: "270px" }}
                      onChange={(e) => setAnnouncement(e.target.value)}
                      value={announcement}
                    />
                    <label htmlFor="announcment" className="text-gray-500">
                      Write an announcement...
                    </label>
                  </div>

                  <div className="flex items-center justify-center gap-x-20">
                    <button
                      type="button"
                      onClick={handlePostAnnouncement}
                      className="py-2 px-4 bg-orange-400 w-fit self-center hover:bg-orange-500 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
                    >
                      Post
                    </button>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaUser className="sm:w-5 sm:h-5 w-4 h-4" />}
                variant="outline"
                className="bg-gray-200"
                borderRadius={"50%"}
                color="gray"
              />
              <MenuList>
                <MenuItem
                  className="flex gap-[10px] items-center"
                  _hover={{ backgroundColor: "red.50" }}
                  onClick={() => {
                    signout();
                  }}
                >
                  <Icon color={"red.400"} as={IoLogOutOutline} w={5} h={5} />
                  <p className="text-red-400">Log Out</p>
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <FaBars
            onClick={handleDrawerToggle}
            className="sm:text-3xl text-base cursor-pointer"
          />
        </div>
      </div>

      {/* Drawer for Mobile */}
      {isDrawerOpen && (
        <motion.div
          className="lg:hidden fixed inset-0 bg-black/80 bg-opacity-30 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white h-full w-80 p-4 fixed top-0 left-0"
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
              className="flex flex-col gap-4 my-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
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
                    isCustomerOpen
                      ? "text-gray-500 bg-gray-50"
                      : "text-gray-500"
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
                    <CustomerLink
                      to={`customers/1`}
                      isCustomerOpen={isLinkActive("/admin/customers/:id")}
                      icon={<CgDetailsMore size={20} />}
                      text="Customer Details"
                    />
                  </div>
                </>
              )}

              <div onClick={toggleRestaurant}>
                <div
                  className={`${
                    isCustomerOpen
                      ? "text-gray-500 bg-gray-50"
                      : "text-gray-500"
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
                    <RestaurantLink
                      to={`restaurants/1`}
                      isRestaurantOpen={isLinkActive("/admin/restaurants/:id")}
                      icon={<CgDetailsMore size={20} />}
                      text="Restaurant Details"
                    />
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminNavbar;
