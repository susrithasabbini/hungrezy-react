import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./../../assets/logoAsset.png";
import { FaBars, FaChevronUp, FaSearch } from "react-icons/fa";
import {
  Button,
  Divider,
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
import { LuLayoutDashboard, LuUser2 } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import MenuLink from "./Dashboard/MenuLink";
import { BiDish } from "react-icons/bi";
import { GrOrderedList } from "react-icons/gr";
import { CiViewList } from "react-icons/ci";
import { RiPlayListAddFill } from "react-icons/ri";
import { MdOutlineEditNote, MdReviews } from "react-icons/md";
import { useAuth } from "../../AuthContext";
import useWebSocket from "../../hooks/useWebsocket";

const RestaurantNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { pathname } = useLocation();
  const { signout, user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [count, setCount] = useState(0);
  const { socket } = useWebSocket(); // Initialize WebSocket hook

  const isLinkActive = (path) => {
    return pathname.startsWith(path);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/admin/announcements`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: "restaurant" }),
      }
    );
    const result = await response.json();
    setAnnouncements(result.data);
  };

  // Listen for "announcement" event from WebSocket
  useEffect(() => {
    if (socket) {
      socket.on("announcement", (newAnnouncement) => {
        setAnnouncements((prevAnnouncements) => [
          newAnnouncement,
          ...prevAnnouncements,
        ]);
        setCount((prev) => prev + 1);
      });

      return () => {
        socket.off("announcement");
      };
    }
  }, [socket, announcements]);

  const getTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = Math.abs(currentTime - postTime) / 1000; // Difference in seconds

    const timeIntervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    let timeAgo = "";

    for (const interval in timeIntervals) {
      const count = Math.floor(timeDifference / timeIntervals[interval]);
      if (count > 0) {
        timeAgo = `${count} ${interval}${count === 1 ? "" : "s"} ago`;
        break;
      }
    }

    return timeAgo || "just now";
  };

  const handlePopoverOpen = () => {
    setPopoverOpen(true);
    fetchAnnouncements();
  };

  const handlePopoverClose = () => {
    setPopoverOpen(false);
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
        <div className="flex-[11] flex justify-between items-center w-full ml-10">
          <div className="flex items-center gap-x-4 border px-4 py-2 rounded-3xl bg-gray-50">
            <FaSearch className="text-gray-500 font-light" />
            <input
              className="outline-none focus:outline-none bg-gray-50"
              placeholder="Search for items..."
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <Popover
              isOpen={popoverOpen}
              onOpen={handlePopoverOpen}
              onClose={handlePopoverClose}
            >
              <PopoverTrigger>
                <Button
                  size="md"
                  rounded={"full"}
                  leftIcon={<IoMdNotificationsOutline className="h-6 w-6" />}
                  colorScheme="gray"
                  backgroundColor={"gray.200"}
                  onClick={() => setCount(0)}
                >
                  {count > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-xs">
                      {count}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent height={"28rem"} overflowY={"scroll"}>
                <PopoverArrow />
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody>
                  {announcements.length === 0 && (
                    <p className="text-sm text-center">No notifications!</p>
                  )}
                  {announcements.map((announcement, index) => (
                    <div key={index}>
                      <div className="flex gap-2 items-center my-3">
                        <div>
                          <p className="text-xs text-end">
                            {getTimeDifference(announcement.createdAt)}
                          </p>
                          <p className="text-sm">{announcement.announcement}</p>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))}
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
                <Link to="profile">
                  <MenuItem icon={<LuUser2 className="w-[18px] h-[18px]" />}>
                    My Profile
                  </MenuItem>
                </Link>

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
              <p className="text-base font-semibold">{user && user.name}</p>
              <p className="text-sm font-normal">{user && user.email}</p>
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
            <Popover
              isOpen={popoverOpen}
              onOpen={handlePopoverOpen}
              onClose={handlePopoverClose}
            >
              <PopoverTrigger>
                <Button
                  size="md"
                  rounded={"full"}
                  leftIcon={<IoMdNotificationsOutline className="h-6 w-6" />}
                  colorScheme="gray"
                  backgroundColor={"gray.200"}
                >
                  {count > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-1 rounded-full text-xs">
                      {count}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent height={"28rem"} overflowY={"scroll"}>
                <PopoverArrow />
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody>
                  {announcements.length === 0 && (
                    <p className="text-sm text-center">No notifications!</p>
                  )}
                  {announcements.map((announcement, index) => (
                    <div key={index}>
                      <div className="flex gap-2 items-center my-3">
                        <div>
                          <p className="text-xs text-end">
                            {getTimeDifference(announcement.createdAt)}
                          </p>
                          <p className="text-sm">{announcement.announcement}</p>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))}
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
                <Link to="profile">
                  <MenuItem icon={<LuUser2 className="w-[18px] h-[18px]" />}>
                    My Profile
                  </MenuItem>
                </Link>
                <MenuItem
                  className="flex gap-[10px] items-center"
                  _hover={{ backgroundColor: "red.50" }}
                  onClick={() => {
                    signout();
                    window.location.reload();
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
              <Link to="dashboard" onClick={handleDrawerToggle}>
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

              <Link to="orders" onClick={handleDrawerToggle}>
                <div
                  className={`${
                    isLinkActive("/restaurant/orders")
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-500"
                  } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
                >
                  <GrOrderedList size={24} />
                  <span className="text-base">Orders</span>
                </div>
              </Link>

              <div onClick={toggleMenu}>
                <div
                  className={`${
                    isMenuOpen ? "text-gray-500 bg-gray-50" : "text-gray-500"
                  } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
                >
                  <BiDish size={24} />
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
                      onClick={handleDrawerToggle}
                      isMenuOpen={isLinkActive("/restaurant/menu")}
                      to="menu"
                      icon={<CiViewList size={20} />}
                      text="Menu List"
                    />
                    <MenuLink
                      onClick={handleDrawerToggle}
                      to="add-menu"
                      isMenuOpen={isLinkActive("/restaurant/add-menu")}
                      icon={<RiPlayListAddFill size={20} />}
                      text="Add Menu"
                    />
                    {isLinkActive("/restaurant/edit-menu") && (
                      <MenuLink
                        onClick={handleDrawerToggle}
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
                  onClick={handleDrawerToggle}
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
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RestaurantNavbar;
