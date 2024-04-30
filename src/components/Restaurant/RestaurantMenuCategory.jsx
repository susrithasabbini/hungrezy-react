import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { GrSquare } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/slices/cartSlice";

const RestaurantMenuCategory = ({
  toggleCategoryVisibility,
  categoryVisibility,
  category,
  foodItems,
  handleDecrement,
  handleIncrement,
}) => {
  const cartItems = useSelector(selectCartItems);
  const isInCart = (itemName) =>
    cartItems.some(
      (item) => item.category === category && item.itemName === itemName
    );

  return (
    <div className="mt-5 border-b-8 pb-4">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => toggleCategoryVisibility(category)}
      >
        <span className="text-lg font-extrabold text-gray-500 mb-4">
          {category}
        </span>
        {categoryVisibility[category] ? (
          <TiArrowSortedUp className="ml-2 h-6 w-6 text-gray-500 mb-3" />
        ) : (
          <TiArrowSortedDown className="ml-2 h-6 w-6 text-gray-500 mb-3" />
        )}
      </div>
      {categoryVisibility[category] && (
        <div>
          {Object.keys(foodItems[category]).map((itemName) => (
            <div
              key={itemName}
              className="flex justify-between items-center mb-2 border-b-2 py-4"
            >
              <div>
                {foodItems[category][itemName].veg_or_non_veg == "Veg" ? (
                  <GrSquare className="text-green-700" />
                ) : (
                  <FaRegCaretSquareUp className="text-red-500" />
                )}
                <p className="text-md font-medium text-gray-700 mt-2">
                  {itemName}
                </p>
                <p className="text-gray-600 mt-2">
                  <FaRupeeSign className="inline mb-1" />{" "}
                  {foodItems[category][itemName].price}
                </p>
              </div>
              {isInCart(itemName) && foodItems[category][itemName].count > 0 ? (
                <div className="w-20 flex flex-row items-center justify-between bg-gray-300 py-2.5 px-2.5 rounded-md text-white text-sm font-medium cursor-pointer">
                  <span onClick={() => handleDecrement(category, itemName)}>
                    <FaMinus />
                  </span>
                  <span className="mx-2">
                    {foodItems[category][itemName].count}
                  </span>
                  <span
                    onClick={() =>
                      handleIncrement(
                        category,
                        itemName,
                        foodItems[category][itemName].price,
                        foodItems[category][itemName].veg_or_non_veg
                      )
                    }
                  >
                    <FaPlus />
                  </span>
                </div>
              ) : (
                <button
                  className="w-20 bg-orange-300  py-2.5 rounded-md text-white text-sm font-bold hover:shadow-lg hover:scale-105 ease-in-out duration-300"
                  onClick={() =>
                    handleIncrement(
                      category,
                      itemName,
                      foodItems[category][itemName].price,
                      foodItems[category][itemName].veg_or_non_veg
                    )
                  }
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuCategory;
