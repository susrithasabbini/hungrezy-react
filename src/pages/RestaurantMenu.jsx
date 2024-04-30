import { useState, useRef, useEffect } from "react";
import RestaurantMenuCategory from "@/components/Restaurant/RestaurantMenuCategory";
import { FaCircleInfo } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { MdRestaurantMenu } from "react-icons/md";
import RestaurantReviews from "@/components/Restaurant/RestaurantReviews";
import BookTable from "@/components/Restaurant/BookTable";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "../redux/slices/cartSlice";
import { toast } from "sonner";
import { useParams } from "react-router";

const RestaurantMenu = () => {
  const location = useLocation();
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState({});
  const [activeTab, setActiveTab] = useState("menu");
  const [isCategoryListVisible, setCategoryListVisible] = useState(false);
  const [isTableBooked, setTableBooked] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectUser);
  const { id } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const show = queryParams.get("show");
  const orderId = queryParams.get("orderId");
  // const initialVisibility = Object.keys(foodItems).reduce(
  //   (acc, category, index) => {
  //     acc[category] = index < 4;
  //     return acc;
  //   },
  //   {}
  // );
  const dispatch = useDispatch();

  const [categoryVisibility, setCategoryVisibility] = useState();
  const categoryRefs = useRef({});

  useEffect(() => {
    switch (show) {
      case "booktable": {
        setActiveTab(show);
        break;
      }
      case "reviews": {
        setActiveTab(show);
        break;
      }
      default:
        setActiveTab("menu");
    }
  }, []);

  useEffect(() => {
    fetchRestaurant().then((res) => {
      setRestaurant(res);

      fetchMenu(res.menu_id)
        .then((response) => {
          if (response._id) delete response._id;
          setFoodItems(response);
          const initialVisibility = Object.keys(response).reduce(
            (acc, category, index) => {
              acc[category] = index < 4;
              return acc;
            },
            {}
          );
          setCategoryVisibility(initialVisibility);
        })
        .catch((error) => {
          console.error("Error fetching menu items:", error);
        });
    });
  }, []);

  const toggleCategoryVisibility = (category) => {
    setCategoryVisibility((prevVisibility) => ({
      ...prevVisibility,
      [category]: !prevVisibility[category],
    }));
  };

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      const result = await response.json();
      console.log(result);
      const data = result.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      throw error;
    }
  };

  const fetchMenu = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/menu/${id}?availability=true`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch menu");
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching menu:", error);
      throw error;
    }
  };

  const handleIncrement = (category, itemName, price, veg_or_non_veg) => {
    dispatch(
      addToCart({
        restaurant: restaurant.name,
        restaurantId: restaurant._id,
        category,
        itemName,
        price,
        veg_or_non_veg,
      })
    );

    toast.success("Item added to cart", {
      position: "bottom-center",
      duration: 2000,
    });

    const item = cartItems.find(
      (item) => item.category === category && item.itemName === itemName
    );

    if (item) {
      setFoodItems((prevFoodItems) => {
        const updatedFoodItems = { ...prevFoodItems };
        if (!updatedFoodItems[category][itemName].count) {
          updatedFoodItems[category][itemName].count = 1;
        } else {
          updatedFoodItems[category][itemName].count += 1;
        }
        return updatedFoodItems;
      });
    } else {
      setFoodItems((prevFoodItems) => {
        const updatedFoodItems = { ...prevFoodItems };
        updatedFoodItems[category][itemName].count = 1;
        return updatedFoodItems;
      });
    }
  };

  const handleDecrement = (category, itemName) => {
    dispatch(removeFromCart({ restaurant: restaurant.name, itemName }));

    const item = cartItems.find(
      (item) => item.category === category && item.itemName === itemName
    );

    if (item) {
      setFoodItems((prevFoodItems) => {
        const updatedFoodItems = { ...prevFoodItems };
        if (updatedFoodItems[category][itemName].count === 1) {
          updatedFoodItems[category][itemName].count = 0;
        } else {
          updatedFoodItems[category][itemName].count -= 1;
        }
        return updatedFoodItems;
      });
    } else {
      setFoodItems((prevFoodItems) => {
        const updatedFoodItems = { ...prevFoodItems };
        updatedFoodItems[category][itemName].count = 0;
        return updatedFoodItems;
      });
    }
  };

  useEffect(() => {
    // Update foodItems based on cart items from the Redux store
    const updatedFoodItems = { ...foodItems };

    cartItems.forEach((cartItem) => {
      const { category, itemName, count } = cartItem;

      if (updatedFoodItems[category] && updatedFoodItems[category][itemName]) {
        updatedFoodItems[category][itemName].count = count;
      }
    });

    setFoodItems(updatedFoodItems);
  }, [cartItems]);

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const scrollToCategory = (category) => {
    if (categoryRefs[category]) {
      categoryRefs[category].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const toggleCategoryList = () => {
    setCategoryListVisible((prevVisible) => !prevVisible);
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="container w-[55rem] mx-auto p-4 mt-28">
      <div className="flex h-fit bg-gradient-to-r from-amber-200 to-orange-400/90 py-8 px-4 rounded-md shadow-md">
        <div>
          <h2 className="text-3xl font-extrabold pt-2 text-gray-600">
            {restaurant.name}
          </h2>
          <p className="text-gray-500 font-semibold text-sm mt-1 ml-1 ">
            {restaurant.cuisine}
          </p>
          <p className="text-gray-500 font-semibold text-lg mt-4 ml-1 ">
            {restaurant.address}
          </p>
          <p className="text-gray-500 font-semibold text-lg mt-2 ml-1 ">
            <FaCircleInfo className="inline text-lg mr-2 mb-1" />
            Based on distance, an additional delivery fee will apply
          </p>
        </div>
      </div>
      <div className="mt-4 ml-2 flex">
        <p className="text-lg font-semibold text-gray-500">
          {restaurant.rating}
          <FaStar className="inline text-xl mb-1 mx-1" />
        </p>
        <p className="ml-6 text-lg font-semibold text-gray-500">
          {restaurant.rating_count}
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex my-4">
        <button
          className={`mr-4 px-4 py-2 text-xl font-semibold ${
            activeTab === "menu"
              ? "text-amber-500 border-b-2 border-amber-500"
              : "text-gray-400"
          } `}
          onClick={() => switchTab("menu")}
        >
          Menu
        </button>
        {/* <button
          className={`px-4 py-2 text-xl font-semibold ${
            activeTab === "booktable"
              ? " text-amber-500 border-b-2 border-amber-500"
              : "text-gray-400"
          } `}
          onClick={() => switchTab("booktable")}
        >
          Book Table
        </button> */}
        <button
          className={`px-4 py-2 text-xl font-semibold ${
            activeTab === "reviews"
              ? " text-amber-500 border-b-2 border-amber-500"
              : "text-gray-400"
          } `}
          onClick={() => switchTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {activeTab == "menu" && (
        <div className="">
          {Object.keys(foodItems).map((category) => (
            <div key={category} ref={(ref) => (categoryRefs[category] = ref)}>
              <RestaurantMenuCategory
                toggleCategoryVisibility={toggleCategoryVisibility}
                category={category}
                categoryVisibility={categoryVisibility}
                foodItems={foodItems}
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
              />
            </div>
          ))}
        </div>
      )}

      {activeTab == "booktable" && (
        <div>
          {isTableBooked ? (
            <div>
              <h3 className="mt-5 text-lg text-green-500 font-semibold">
                Your table booking at {restaurant.name} is Successfull!
              </h3>
              <h5 className="mt-2 text-gray-500">
                Go to Account/Table Bookings for Details.
              </h5>
              <button
                onClick={() => setTableBooked(false)}
                className="w-full py-2 mt-5 bg-orange-500 text-white font-bold rounded"
              >
                Book another Table
              </button>
            </div>
          ) : (
            <BookTable
              currentUser={currentUser}
              restaurant={restaurant}
              setTableBooked={setTableBooked}
            />
          )}
        </div>
      )}

      {activeTab == "reviews" && (
        <div>
          <RestaurantReviews restaurantId={restaurant._id} />
        </div>
      )}

      {activeTab == "menu" && (
        <div>
          {/* Browse Menu Button */}
          <button
            className="fixed bottom-8 right-8 bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg text-white px-4 py-4 rounded-full cursor-pointer "
            onClick={toggleCategoryList}
          >
            <MdRestaurantMenu className="inline text-xl mr-2" />
            Menu
          </button>

          {/* Category List */}
          {isCategoryListVisible && (
            <CategoryList
              categories={Object.keys(foodItems)}
              scrollToCategory={scrollToCategory}
              onHide={toggleCategoryList}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantMenu;

const CategoryList = ({ categories, scrollToCategory, onHide }) => {
  return (
    <div className="bg-white min-w-64 max-h-96  px-8 py-4 shadow-md   rounded-md fixed bottom-32 right-8 overflow-scroll scrollbar-hide">
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <button
              onClick={() => {
                scrollToCategory(category);
                onHide();
              }}
              className="text-gray-400 font-medium ease-in-out duration-300 hover:text-gray-500 hover:scale-110 focus:outline-none"
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
