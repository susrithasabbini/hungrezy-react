import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa6";
import { useLocation, useParams } from "react-router-dom";
import { FiSave } from "react-icons/fi";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdDelete, MdOutlinePublic } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";
import { toast } from "sonner";

const EditMenu = () => {
  const formVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const { id } = useParams();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a specific query parameter
  const category = queryParams.get("category");
  const item = queryParams.get("item");

  const [menuItem, setMenuItem] = useState({
    name: "",
    price: "",
    category: "",
    veg_or_non_veg: "",
    available: false,
  });
  const { user, accessToken } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleToggle = () => {
    setMenuItem((prev) => ({
      ...prev,
      veg_or_non_veg: prev.veg_or_non_veg === "Veg" ? "Non-veg" : "Veg",
    }));
  };

  useEffect(() => {
    fetchMenuDetails();
  }, []);

  const fetchMenuDetails = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      return;
    }

    console.log(result.data[category][item]);
    setMenuItem({
      name: item,
      price: result.data[category][item].price,
      category: category,
      veg_or_non_veg: result.data[category][item].veg_or_non_veg,
      available: result.data[category][item].availability,
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/updateMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          restaurantId: user._id,
          menuItem: {
            name: menuItem.name,
            category: menuItem.category,
            price: menuItem.price,
            veg_or_non_veg: menuItem.veg_or_non_veg,
            available: menuItem.available,
          },
        }),
      }
    );

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("Menu item updated successfully");
    setLoading(false);
  };

  const handleDraft = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/updateMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          restaurantId: user._id,
          menuItem: {
            name: menuItem.name,
            category: menuItem.category,
            price: menuItem.price,
            veg_or_non_veg: menuItem.veg_or_non_veg,
            available: false,
          },
        }),
      }
    );

    const result = await response.json();

    setMenuItem((prev) => ({
      ...prev,
      price: menuItem.price,
      available: false,
    }));

    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("Menu item updated successfully");
    setLoading(false);
  };

  const handlePublish = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/updateMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          restaurantId: user._id,
          menuItem: {
            name: menuItem.name,
            category: menuItem.category,
            price: menuItem.price,
            veg_or_non_veg: menuItem.veg_or_non_veg,
            available: true,
          },
        }),
      }
    );

    const result = await response.json();

    setMenuItem((prev) => ({
      ...prev,
      price: menuItem.price,
      available: true,
    }));

    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("Menu item updated successfully");
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/deleteMenu`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          restaurantId: user._id,
          menuItem: {
            name: item,
            category: category,
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      setLoading(false);
      return;
    }
    toast.success("Menu item deleted successfully");
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-medium">Edit Menu</h1>
          <div className="flex items-center py-2.5 gap-2 mx-5">
            <p>Restaurant</p>
            <span>
              <FaChevronRight className="text-gray-500" />
            </span>
            <p className="text-orange-500 underline">Edit Menu</p>
          </div>
        </div>
        <div className="h-fit flex flex-row w-full gap-x-10 mt-20">
          <form className="flex flex-col w-[50rem] gap-4 pb-20 mx-auto">
            <motion.div
              variants={formVariants}
              className="flex flex-col form-floating mt-2 gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="form-floating">
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="form-floating">
                  <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>

              <div className="form-floating">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </div>

              <div className="form-floating">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-full"></div>
              </div>

              <FormControl display="flex" alignItems="center">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </FormControl>
            </motion.div>
            <div className="flex items-center justify-center gap-x-20 mt-10">
              <motion.button
                type="button"
                className="py-2 px-4 bg-gray-200 w-fit self-center justify-center transition-colors duration-300 text-gray-800 rounded-md flex items-center"
                whileHover={{ scale: 1.005 }}
                disabled
              ></motion.button>

              <motion.button
                type="button"
                className="py-2 px-4 bg-gray-200 w-fit self-center justify-center transition-colors duration-300 text-gray-800 rounded-md flex items-center"
                whileHover={{ scale: 1.005 }}
                disabled
              ></motion.button>

              <motion.button
                type="button"
                className="py-2 px-4 bg-gray-200 w-fit self-center justify-center transition-colors duration-300 text-gray-800 rounded-md flex items-center"
                whileHover={{ scale: 1.005 }}
                disabled
              ></motion.button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Edit Menu</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Edit Menu</p>
        </div>
      </div>
      <div className="h-fit flex flex-row w-full gap-x-10">
        <form className="flex flex-col w-[50rem] gap-4 pb-20 mx-auto mt-20">
          <motion.div
            variants={formVariants}
            className="flex flex-col form-floating mt-2 gap-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full ${
                    menuItem?.name ? "border-amber-600" : ""
                  }`}
                  id="menuItemName"
                  placeholder="Menu Item Name"
                  name="name"
                  type="text"
                  value={menuItem?.name}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="menuItemName" className="text-gray-500">
                  Menu Item Name
                </label>
              </div>

              <div className="form-floating">
                <input
                  className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full ${
                    menuItem?.price ? "border-amber-600" : ""
                  }`}
                  id="menuItemPrice"
                  placeholder="Menu Item Price"
                  name="price"
                  type="number"
                  value={menuItem?.price}
                  onChange={handleChange}
                />
                <label htmlFor="menuItemPrice" className="text-gray-500">
                  Menu Item Price
                </label>
              </div>
            </div>

            <div className="form-floating">
              <input
                className={`form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full ${
                  menuItem?.category ? "border-amber-600" : ""
                }`}
                id="menuItemCategory"
                placeholder="Menu Item Category"
                name="category"
                value={menuItem?.category}
                onChange={handleChange}
                disabled
              ></input>
              <label htmlFor="menuItemCategory" className="text-gray-500">
                Menu Item Category
              </label>
            </div>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="Veg" mb="0">
                Veg
              </FormLabel>
              <Switch
                id="Veg"
                onChange={handleToggle}
                disabled
                colorScheme="green"
                isChecked={menuItem?.veg_or_non_veg === "Veg"}
              />
            </FormControl>
          </motion.div>
          <div className="flex items-center justify-center gap-x-20">
            <motion.button
              type="button"
              className="py-2 px-4 bg-amber-500 w-fit self-center hover:bg-amber-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
              onClick={handleSave}
            >
              <span className="align-baseline text-center">Save</span>
              <FiSave className="ml-2 align-baseline" />
            </motion.button>

            {menuItem?.available === false ? (
              <motion.button
                type="button"
                className="py-2 px-4 bg-green-700 w-fit self-center hover:bg-green-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
                whileHover={{ scale: 1.005 }}
                onClick={handlePublish}
              >
                <span className="align-baseline text-center">Publish</span>
                <MdOutlinePublic className="ml-2 align-baseline" />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                className="py-2 px-4 bg-gray-200 w-fit self-center justify-center hover:bg-gray-300 transition-colors duration-300 text-gray-800 rounded-md flex items-center"
                whileHover={{ scale: 1.005 }}
                onClick={handleDraft}
              >
                <span className="align-baseline text-center">Draft</span>
                <RiDraftLine className="ml-2 align-baseline" />
              </motion.button>
            )}

            <motion.button
              type="button"
              className="py-2 px-4 bg-red-500 w-fit self-center hover:bg-red-700 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
              onClick={handleDelete}
            >
              <span className="align-baseline text-center">Delete</span>
              <MdDelete className="ml-2 align-baseline" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMenu;
