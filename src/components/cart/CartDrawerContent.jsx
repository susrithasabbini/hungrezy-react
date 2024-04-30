import { motion } from "framer-motion";
import {
  FaTimes,
  FaUtensils,
  FaPlus,
  FaMinus,
  FaRegCaretSquareUp,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../AuthContext";
import {
  addToCart,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectTotalPrice,
} from "../../redux/slices/cartSlice";
import { GrSquare } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const CartDrawerContent = ({ isDrawerOpen, handleCartDrawerToggle }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const navigate = useNavigate();
  const {user,loading} = useAuth()

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5 } },
  };

  const handleAddItemToCart = (item) => {
    dispatch(addToCart({ ...item }));
  };

  const handleRemoveItemFromCart = (item) => {
    dispatch(removeFromCart({ ...item }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 bg-opacity-30 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`bg-white h-full w-96 p-4 overflow-y-auto fixed top-0 ${
          isDrawerOpen ? "left-0" : "right-0"
        }`}
        initial={{ x: isDrawerOpen ? "-100%" : "100%" }}
        animate={{ x: 0 }}
        exit={{ x: isDrawerOpen ? "-100%" : "100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <FaTimes
            className="text-2xl cursor-pointer"
            onClick={handleCartDrawerToggle}
          />
        </div>

        <div>
          {cartItems.length === 0 ? (
            <p className="text-red-500 flex items-center justify-center text-xl font-bold">
              Your cart is empty.
            </p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="mb-4 border-b pb-2">
                  <div className="flex items-center mb-2">
                    <FaUtensils className="text-gray-500 mr-2" />
                    <p className="font-bold text-black">{item.restaurant}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 font-semibold py-1">
                      {item.itemName}
                    </p>
                    <div className="flex items-center justify-between">
                      {item.veg_or_non_veg === "Veg" ? (
                        <GrSquare className="text-green-700" />
                      ) : (
                        <FaRegCaretSquareUp className="text-red-500" />
                      )}
                      <p className="ml-2">{item.veg_or_non_veg}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 flex-grow gap-28">
                    <p className="text-gray-800">&#8377;{item.price}</p>
                    <div className="flex items-center">
                      <FaMinus
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveItemFromCart({ ...item })}
                      />
                      <p className="mx-2">{item.count}</p>
                      <FaPlus
                        className="text-green-500 cursor-pointer"
                        onClick={() => handleAddItemToCart({ ...item })}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <p className="text-black font-bold text-lg">Subtotal</p>
            <p className="text-black font-bold text-3xl">&#8377;{totalPrice}</p>
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <motion.button
              type="button"
              className="py-3 px-6 bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              variants={variants}
              onClick={handleClearCart}
            >
              <FaTrash className="align-baseline w-4 h-4" />
              <span className="ml-2 align-baseline">Clear</span>
            </motion.button>

            <motion.button
              type="button"
              className="py-3 px-8 bg-amber-500 hover:bg-amber-600 transition-colors duration-300 text-white rounded-full flex items-center"
              whileHover={{ scale: 1.05 }}
              variants={variants}
              onClick={() => {
                if( !user)navigate('/signin')
                else navigate("/checkout");
                handleCartDrawerToggle();
              }}
            >
              <span className="align-baseline">Check out</span>
              <FaArrowRight className="ml-2 align-baseline" />
            </motion.button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CartDrawerContent;
