import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaThumbsUp, FaComment } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { useAuth } from "../../AuthContext";
import {toast} from 'sonner';

const initialReviews = [
  {
    id: 1,
    userName: 'Vivek Vardhan Chilluri',
    userProfile: 'https://example.com/user1.jpg',
    rating: 4,
    reviewText: 'Great food and friendly service!',
    helpfulVotes: 15,
    comments: [
      { id: 101, userName: 'Jane Smith', commentText: 'I agree, it was fantastic!' },
    ],
    date: '2023-10-15',
  },
  {
    id: 2,
    userName: 'Vivek Vardhan Chilluri',
    userProfile: 'https://example.com/user1.jpg',
    rating: 5,
    reviewText: 'awesome taste and I want more',
    helpfulVotes: 20,
    comments: [
      { id: 101, userName: 'Jane Smith', commentText: 'I agree, it was fantastic!' },
    ],
    date: '2023-11-15',
  },
  // Add more review objects as needed
];

const RestaurantReviews = ({restaurantId}) => {
    const [allReviews, setAllReviews] = useState([]);
    const [displayReviews, setDisplayReviews] = useState([...allReviews]);
    const [newReview, setNewReview] = useState({
        userId: '',
        rating: 5,
        review: '',
    });
    const {user,loading,accessToken} = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };
  console.log(restaurantId)
  const handleAddReview = async() => {
    if (user) {
      let temp=newReview;
      temp.userId=user._id;
      let newReviewObject = await postReview(temp,accessToken)
      setAllReviews((prevAllReviews) => [...prevAllReviews, newReviewObject]);
      setDisplayReviews((prevDisplayReviews) => [...prevDisplayReviews, newReviewObject]);
      setNewReview({
        userId: '',
        rating: 5,
        review: '',
      });
    }
  };

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
      console.log(result)
      return result.data;
    }catch(error){
        console.error(error);
    }
  }

  useEffect(()=>{
    let reviews = []
    const fetchReviews = async()=>{
      reviews = await getReviews(restaurantId)
      setAllReviews(reviews);
      setDisplayReviews(reviews);
    }
    fetchReviews();
  },[])

  const postReview = async(restaurantReview,accessToken)=>{
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/review/restaurant/${restaurantId}`;
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(restaurantReview)
      });
      if (!response.ok) {
        toast.error('Failed to post review');
        return;
      }
      const result = await response.json();
      toast.success("Review posted succesfully!");
      return result.data;
    }catch(error){
        console.error(error);
        toast.error(error.message);
    }
  }

  const handleSortChange = (sortOption) => {
    setDisplayReviews((prevDisplayReviews) => {
      switch (sortOption) {
        case 'newest':
          return [...prevDisplayReviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'oldest':
          return [...prevDisplayReviews].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        case 'highVotes':
          return [...prevDisplayReviews].sort((a, b) => b.helpfulVotes - a.helpfulVotes);
        case 'lowVotes':
          return [...prevDisplayReviews].sort((a, b) => a.helpfulVotes - b.helpfulVotes);
        default:
          return prevDisplayReviews;
      }
    });
  };

  const handleFilterChange = (filterOption) => {
    setDisplayReviews((prevDisplayReviews) => {
      switch (filterOption) {
        case 'all':
          const uniqueReviews = new Map([...allReviews, ...prevDisplayReviews].map((review) => [review._id, review]));
          return Array.from(uniqueReviews.values());
        default:
          const filterValue = parseInt(filterOption);
          return allReviews.filter((review) => review.rating >= filterValue);
      }
    });
  };

  
  

  return (
    <div className="container mx-auto p-4">
     
      {/* Sort and Filter Options */}
      <div className="mb-6 text-gray-600 font-semibold">
        <label className="mr-6 text-gray-500 font-semibold">Sort By</label>
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          className="p-2 border border-gray-300 rounded w-72 h-16 outline-none"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highVotes">High Helpful Votes First</option>
          <option value="lowVotes">Low Helpful Votes First</option>
        </select>

        <label className="ml-10 mr-6 text-gray-500 font-semibold">Filter By</label>
        <select
          onChange={(e) => handleFilterChange(e.target.value)}
          className="p-2 border border-gray-300 rounded w-72 h-16 outline-none"
        >
          <option value="all">All Ratings</option>
          <option value="3">3 Stars and Above</option>
          <option value="4">4 Stars and Above</option>
          <option value="5">5 Stars</option>
        </select>
      </div>

      {/* Reviews Section */}
      <div className='border-b-4 pb-4'>
        {displayReviews.map((review) => (
          <div key={review._id} className="mb-6 p-4 border border-gray-300 rounded">
            <div className="flex items-center mb-2">
              {
                review.userId.image?
                <img src={review.userId.image} className='w-12 h-12 mr-2 object-cover rounded-full'/>:
                <FaUserCircle className="text-4xl text-gray-500 mr-2" />
              }
              <div>
                <p className="font-semibold">{review.userId.firstName+" "+review.userId.lastName}</p>
                <p className="text-gray-500">
                  <AiFillStar className="inline text-yellow-500 text-lg" />
                  {review.rating}
                </p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.review}</p>
            <div className="flex items-center text-gray-500 mb-2">
              <FaThumbsUp className="mr-1" />
              {review.helpfulVotes} Helpful Votes
              <FaComment className="ml-4 mr-1" />
              10 Comments
            </div>
            <p className="text-sm text-gray-500">
              {new Date(review.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Section */}
      {
        user ? 
        <div className="my-6 ">
        <h2 className="text-xl font-semibold mb-2 text-gray-500 ">Add  Review</h2>
        <div className='flex justify-between mt-4'>
        <div className="flex flex-col mb-2 w-96">
          <label htmlFor="userName" className="mr-2 text-gray-500 font-semibold mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.firstName+" "+user.lastName}
            onChange={handleInputChange}
            className="p-2 font-medium text-gray-500 border border-gray-300 rounded h-12 outline-none"
            disabled
          />
        </div>
        <div className="flex flex-col mb-2 w-96">
          <label htmlFor="rating" className="mr-2 text-gray-500 font-semibold mb-1">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            value={newReview.rating}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded h-12 outline-none"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        </div>
        
        <div className="flex flex-col mb-2 mt-3">
          <label htmlFor="reviewText" className="mr-2 text-gray-500 font-semibold mb-1">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            value={newReview.review}
            onChange={handleInputChange}
            rows={5}
            className="p-2 border border-gray-300 rounded outline-none"
          />
        </div>
        <button
          onClick={handleAddReview}
          className="bg-amber-500 text-white px-4 py-2.5 mt-4 rounded-md hover:bg-amber-600 focus:outline-none"
        >
          Submit Review
        </button>
      </div>:
      <div>
       <div class="relative">
          <div class="absolute inset-0 bg-gray-200 opacity-50 blur-md"></div>
          <div class="relative bg-white shadow-md rounded-md p-8"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <p class="text-gray-600">Sign in to write a review. <a href="/signin" class="text-blue-500 font-semibold hover:underline">Sign in</a></p>
          </div>
        </div>

      </div>

      }

    </div>
  );
};

export default RestaurantReviews;
