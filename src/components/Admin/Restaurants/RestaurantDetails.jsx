import { BadgeCheckIcon } from "@heroicons/react/outline";
import { Badge, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import { IoPricetag } from "react-icons/io5";
import { MdEmail, MdFoodBank, MdOutlinePending, MdPlace } from "react-icons/md";
import { RiQuestionFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectMenu, setMenu } from "../../../redux/slices/menuSlice";
import Skeleton from "./Skeleton";
import MenuItemsTable from "./MenuItemsTable";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ConfirmationModal from "./ConfirmationModal";

const RestaurantDetails = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const menu = useSelector(selectMenu);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const handleDone = () => {
    fetchRestaurantDetails(id);
  };

  useEffect(() => {
    setLoading(true);
    fetchRestaurantDetails(id);
    setLoading(false);
  }, [id]);

  const toggleModal = async (status) => {
    setOpenModal(!openModal);
    setStatus(status);
  };

  const fetchRestaurantDetails = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/${id}`
    );
    if (!response.ok) {
      setRestaurant(null);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setRestaurant(result.data);

    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/menu/${
      result.data.menu_id
    }`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      delete result.data._id;
      const temp = convertMenuObjecttoArray(result.data);
      dispatch(setMenu(temp));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const convertMenuObjecttoArray = (menuObject) => {
    const menuArray = [];
    for (const category in menuObject) {
      for (const item in menuObject[category]) {
        menuArray.push({
          id: `${category.replace(/\s+/g, "")}-${item.replace(/\s+/g, "")}`,
          name: item,
          price: menuObject[category][item].price,
          category: category,
          quantity: 1,
          discount: 0,
          available: menuObject[category][item].availability,
        });
      }
    }
    return menuArray;
  };


  if (loading || !restaurant) {
    return <Skeleton />;
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">View Restaurant</h1>
        <div className="flex items-center py-3 gap-3 mx-2">
          <div className="flex items-center gap-2">
            <p>Admin</p>
            <span>
              <FaChevronRight className="text-gray-500" />
            </span>
            <p className="text-orange-500 underline">Restaurant</p>
          </div>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical color="gray" className="w-4 h-4" />}
              variant="outline"
              className="bg-gray-200"
              borderRadius={"50%"}
              size={"md"}
            />
            <MenuList>
              {restaurant.status !== "approved" && (
                <MenuItem onClick={() => toggleModal("approved")}>
                  Approve
                </MenuItem>
              )}
              {restaurant.status !== "suspended" &&
                restaurant.status !== "inprogress" && (
                  <MenuItem onClick={() => toggleModal("suspended")}>
                    Suspend
                  </MenuItem>
                )}
              {restaurant.status !== "rejected" &&
                restaurant.status === "inprogress" && (
                  <MenuItem onClick={() => toggleModal("rejected")}>
                    Reject
                  </MenuItem>
                )}
            </MenuList>
          </Menu>
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          openModal={openModal}
          toggleModal={toggleModal}
          restaurantId={restaurant._id}
          status={status}
          handleDone={handleDone}
        />
      )}
      <div className="flex lg:flex-row flex-col items-center my-4">
        <div className="lg:flex-[3]">
          <img
            src={restaurant?.image}
            alt={restaurant?.name}
            className="xl:h-[20rem] xl:w-[20rem] md:h-[18rem] md:w-[18rem] w-[25rem] h-[25rem] rounded-full"
          />
        </div>

        <div className="border rounded p-4 items-center mt-4 justify-center lg:flex-[5] md:w-[40rem] w-[20rem]">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <BiSolidFoodMenu className="mr-2" />
                  Name:
                </p>
                <p className="text-gray-700">{restaurant?.name}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <MdEmail className="mr-2" />
                  Email:
                </p>
                <p className="text-gray-700">{restaurant?.email}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <FaStar className="mr-2" />
                  Rating:
                </p>
                <p className="text-gray-700">{restaurant?.rating}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <IoPricetag className="mr-2" />
                  Cost:
                </p>
                <p className="text-orange-500 text-xl">{restaurant?.cost}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <MdFoodBank className="mr-2" />
                  Cuisine:
                </p>
                <p className="text-gray-700">{restaurant?.cuisine}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <MdPlace className="mr-2" />
                  Address:
                </p>
                <p className="text-gray-700">
                  {restaurant?.area}, {restaurant?.city}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <RiQuestionFill className="mr-2" />
                  Status:
                </p>
                {restaurant?.status && (
                  <Badge
                    className="px-3 py-1 flex items-center w-28"
                    color={
                      restaurant.status === "approved"
                        ? "green"
                        : restaurant.status === "suspended"
                        ? "yellow"
                        : restaurant.status === "inprogress"
                        ? "blue"
                        : "red"
                    }
                    icon={
                      restaurant.status === "approved"
                        ? BadgeCheckIcon
                        : restaurant.status === "rejected"
                        ? RxCross2
                        : restaurant.status === "inprogress"
                        ? MdOutlinePending
                        : RxCross2
                    }
                  >
                    <Text>
                      {restaurant.status.charAt(0).toUpperCase() +
                        restaurant.status.slice(1)}
                    </Text>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xl font-medium px-4">Menu</p>

      <MenuItemsTable Menu={menu} />
    </div>
  );
};

export default RestaurantDetails;
