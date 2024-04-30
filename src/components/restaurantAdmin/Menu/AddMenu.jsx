import { motion } from "framer-motion";
import { FaArrowRight, FaChevronRight } from "react-icons/fa6";
import { TiArrowBackOutline } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { addMenuItem } from "../../../redux/slices/menuSlice";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "../../../AuthContext";
import { Switch } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";

const AddMenu = () => {
  const emptyItem = {
    id: "",
    name: "",
    price: "",
    category: "",
    quantity: 1,
    discount: 0,
    veg_or_non_veg: "Veg",
    available: true,
  };
  const [menuItem, setMenuItem] = useState(emptyItem);
  const dispatch = useDispatch();
  const { user, accessToken } = useAuth();
  const formVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setMenuItem((prev) => ({
      ...prev,
      veg_or_non_veg: prev.veg_or_non_veg === "Veg" ? "Non-veg" : "Veg",
    }));
  };

  const handleAddMenuItem = async () => {
    const temp = menuItem;
    temp.id = `${temp.category.replace(/\s+/g, "")}-${temp.name.replace(
      /\s+/g,
      ""
    )}`;
    dispatch(addMenuItem(temp));
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/menu/addMenu`,
      {
        method: "POST",
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
          },
        }),
      }
    );
    const result = await response.json();
    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      return;
    }
    toast.success("Menu Item Added");
    setMenuItem(emptyItem);
  };


  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Add Menu</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Add Menu</p>
        </div>
      </div>
      <div className="h-fit flex md:flex-row flex-col w-full gap-x-10 items-center justify-center">
        <form className="flex flex-col md:w-[50rem] gap-4 sm:w-[30rem] w-[20rem]">
          <motion.div
            variants={formVariants}
            className="flex flex-col form-floating mt-20 mb-10 gap-4"
          >
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="form-floating">
                <input
                  className="form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full"
                  id="menuItemName"
                  placeholder="Menu Item Name"
                  name="name"
                  value={menuItem.name}
                  type="text"
                  onChange={handleChange}
                />
                <label htmlFor="menuItemName" className="text-gray-500">
                  Menu Item Name
                </label>
              </div>

              <div className="form-floating">
                <input
                  className="form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full"
                  id="menuItemPrice"
                  placeholder="Menu Item Price"
                  name="price"
                  type="number"
                  value={menuItem.price}
                  onChange={handleChange}
                />
                <label htmlFor="menuItemPrice" className="text-gray-500">
                  Menu Item Price
                </label>
              </div>
            </div>

            <div className="form-floating">
              <input
                className="form-control focus:shadow-none focus:border-amber-600 rounded-md w-full h-full"
                id="menuItemCategory"
                placeholder="Menu Item Category"
                name="category"
                onChange={handleChange}
                value={menuItem.category}
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
                colorScheme="green"
                isChecked={menuItem.veg_or_non_veg === "Veg"}
              />
            </FormControl>
          </motion.div>
          <div className="flex items-center justify-center gap-x-20">
            <motion.button
              onClick={() => window.history.back()}
              type="button"
              className="py-2 px-4 bg-red-500 w-fit self-center hover:bg-red-700 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
            >
              <span className="align-baseline text-center">Cancel</span>
              <TiArrowBackOutline className="ml-2 align-baseline" />
            </motion.button>
            <motion.button
              type="button"
              className="py-2 px-4 bg-amber-500 w-fit self-center hover:bg-amber-600 justify-center transition-colors duration-300 text-white rounded-md flex items-center"
              whileHover={{ scale: 1.005 }}
              onClick={handleAddMenuItem}
            >
              <span className="align-baseline text-center">Add</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
