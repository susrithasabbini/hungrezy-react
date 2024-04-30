import { Select, SelectItem } from "@tremor/react";
import { useState ,useEffect} from "react";
import { FaChevronRight } from "react-icons/fa6";
import ReviewCard from "./RestaurantReviewCard";
import { Image } from "@chakra-ui/react";
import error from "../../../assets/error.png";
import { reviewsData } from "../../../data/reviews";
import { useAuth } from "../../../AuthContext";

const RestaurantReviews = () => {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [reviewsData,setReviewsData] = useState([]);
  const {user} = useAuth()
  const getReviews = async(restaurantId)=>{
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/review/restaurant/${restaurantId}`;
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Failed to fetch reviews');
        return [];
      }
      const result = await response.json();
      return result.data;
    }catch(error){
        console.error(error);
    }
  }

  useEffect(()=>{
    let reviews = []
    const fetchReviews = async()=>{
      reviews = await getReviews(user._id)
      setReviewsData(reviews)
    }
    fetchReviews();
  },[])


  const filteredReviews = reviewsData.filter((review) => {
    if (
      (!ratingFilter || ratingFilter === "all") &&
      (!dateFilter || dateFilter === "all")
    ) {
      return true;
    }

    let ratingCondition =
      !ratingFilter ||
      Number(ratingFilter) === review.rating ||
      ratingFilter === "all";

    if (ratingFilter === "below") {
      ratingCondition = review.rating < 3;
    }
    const reviewDate = new Date(review.date);
    const today = new Date();
    let lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    let lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    let lastYear = new Date(today);
    lastYear.setFullYear(today.getFullYear() - 1);

    switch (dateFilter) {
      case "today":
        return (
          ratingCondition &&
          reviewDate.getDate() === today.getDate() &&
          reviewDate.getMonth() === today.getMonth() &&
          reviewDate.getFullYear() === today.getFullYear()
        );
      case "last-week":
        return ratingCondition && reviewDate >= lastWeek;
      case "last-month":
        return ratingCondition && reviewDate >= lastMonth;
      case "last-year":
        return ratingCondition && reviewDate >= lastYear;
      default:
        return ratingCondition;
    }
  });

  if (filteredReviews.length === 0)
    return (
      <div className="flex flex-col items-center justify-center my-20">
        <p className="text-orange-600 text-base font-semibold text-center">
          No Reviews Found, Please check back later
        </p>
        <Image src={error} alt="No Reviews" />
      </div>
    );

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Reviews</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Reviews</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row items-center">
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-500">Rating:</p>
          <Select
            className="w-24 ml-2"
            placeholder="Rating"
            value={ratingFilter}
            onValueChange={setRatingFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer" defaultChecked>
              All
            </SelectItem>
            <SelectItem value="5" className="cursor-pointer">
              5 Stars
            </SelectItem>
            <SelectItem value="4" className="cursor-pointer">
              4 Stars
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              3 Stars
            </SelectItem>
            <SelectItem value="below" className="cursor-pointer">
              Below
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-500">Date:</p>
          <Select
            className="w-32 ml-2"
            placeholder="Date"
            value={dateFilter}
            onValueChange={setDateFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="today" className="cursor-pointer">
              Today
            </SelectItem>
            <SelectItem value="last-week" className="cursor-pointer">
              Last Week
            </SelectItem>
            <SelectItem value="last-month" className="cursor-pointer">
              Last Month
            </SelectItem>
            <SelectItem value="last-year" className="cursor-pointer">
              Last Year
            </SelectItem>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 pb-4">
        {filteredReviews.map((review) => (
          <div key={review._id} className="bg-white p-6 rounded-lg shadow-md">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantReviews;
