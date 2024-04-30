import { FaRegStar, FaStar } from "react-icons/fa6";

const AdminReviewCard = ({ review }) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-semibold mr-2">{review.name}</h3>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-yellow-400">
              {index < review.rating ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-600">{review.message}</p>
    </>
  );
};

export default AdminReviewCard;
