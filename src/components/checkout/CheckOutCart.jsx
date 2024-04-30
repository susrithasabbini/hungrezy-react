import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectTotalItems,
  selectTotalPrice,
  addToCart,
  removeFromCart,
} from "./../../redux/slices/cartSlice";
import { FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const CheckOutCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalItems = useSelector(selectTotalItems);
  const totalPrice = useSelector(selectTotalPrice);

  const handleAddItemToCart = (item) => {
    dispatch(addToCart({ ...item }));
  };

  const handleRemoveItemFromCart = (item) => {
    dispatch(removeFromCart({ ...item }));
  };

  const formVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="flex-1 bg-white rounded-md pb-20 h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500">Your Order:</h2>
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-2xl text-gray-600" />
          <span className="text-2xl font-bold text-gray-600">{totalItems}</span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-sm p-4 rounded-3xl flex justify-between items-center w-full h-full"
          >
            <div className="flex items-center gap-4 w-2/3">
              {/* You can add an image here if you have it */}
              <div>
                <h3 className="text-xl font-bold">{item.itemName}</h3>
                <p className="text-gray-500">Quantity: {item.count}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-[20rem]">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => handleRemoveItemFromCart({ ...item })}
                  className="bg-red-500 text-white p-2 rounded-full transition-colors duration-300"
                  variants={formVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <FaMinus />
                </motion.button>
                <span className="text-xl font-bold">{item.count}</span>
                <motion.button
                  onClick={() => handleAddItemToCart({ ...item })}
                  className="bg-green-500 text-white p-2 rounded-full transition-colors duration-300"
                  variants={formVariants}
                  whileHover={{ scale: 1.2 }}
                >
                  <FaPlus />
                </motion.button>
              </div>
              <p className="text-xl font-bold text-gray-500">
                &#8377;{item.price}
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-end mb-20">
          <div className="text-2xl font-bold text-black">To Pay:</div>
          <div className="text-2xl font-bold ml-2">&#8377;{totalPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutCart;
