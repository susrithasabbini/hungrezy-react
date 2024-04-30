import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import {
  Badge,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { RxCross2 } from "react-icons/rx";
import { MdOutlinePending } from "react-icons/md";
import { Image } from "@chakra-ui/react";
import error from "../../../assets/error.png";
import { FaSearch } from "react-icons/fa";

const RestaurantsList = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [searchFilter, setSearchFilter] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, [currentPage, ratingFilter, statusFilter, searchFilter]);

  const fetchRestaurants = async () => {
    setLoading(true);
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/restaurant/all?page=${currentPage}&perPage=10`;

    if (statusFilter !== "all") {
      url += `&status=${statusFilter}`;
    }

    if (ratingFilter !== "all") {
      url += `&rating=${ratingFilter}`;
    }

    if (searchFilter) {
      url += `&search=${searchFilter}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      setRestaurants([]);
      setLoading(false);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    const { data, totalPages: total } = result;
    setRestaurants(data);
    setTotalPages(total);
    setLoading(false);
  };

  const handleStatusChange = (value) => {
    setCurrentPage(1);
    setStatusFilter(value);
  };

  const handleRatingChange = (value) => {
    setCurrentPage(1);
    setRatingFilter(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginationNumbers = [];
  let startPage = currentPage - 2;
  if (startPage < 1) {
    startPage = 1;
  }
  let endPage = startPage + 4;
  if (endPage > totalPages) {
    endPage = totalPages;
  }
  for (let i = startPage; i <= endPage; i++) {
    paginationNumbers.push(
      <button
        key={i}
        className={`mx-1.5 px-1.5 border rounded ${
          currentPage === i ? "bg-orange-500 text-white" : "text-orange-500"
        }`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  const skeletonRows = Array.from({ length: 10 }).map((_, index) => (
    <TableRow key={index}>
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Restaurants List</h1>
        <div className="flex items-center py-2.5 gap-2 mx-2">
          <p>Admin</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Restaurants List</p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-y-5 items-center mt-2 sm:gap-x-5">
        <div className="flex items-center gap-x-4 border px-4 py-2 rounded-3xl bg-gray-50">
          <FaSearch className="text-gray-500 font-light" />
          <input
            className="outline-none focus:outline-none bg-gray-50"
            placeholder="Search for items..."
            onChange={(e) => setSearchFilter(e.target.value)}
            value={searchFilter}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Status: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Status"
            value={statusFilter}
            onValueChange={handleStatusChange}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="approved" className="cursor-pointer">
              Approved
            </SelectItem>
            <SelectItem value="rejected" className="cursor-pointer">
              Rejected
            </SelectItem>
            <SelectItem value="suspended" className="cursor-pointer">
              Suspended
            </SelectItem>
            <SelectItem value="inprogress" className="cursor-pointer">
              In Progress
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Rating: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Rating"
            value={ratingFilter}
            onValueChange={handleRatingChange}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="4" className="cursor-pointer">
              4+
            </SelectItem>
            <SelectItem value="3" className="cursor-pointer">
              3+
            </SelectItem>
            <SelectItem value="2" className="cursor-pointer">
              2+
            </SelectItem>
            <SelectItem value="1" className="cursor-pointer">
              1+
            </SelectItem>
          </Select>
        </div>
      </div>
      <Table className="mt-4 h-[25rem] overflow-y-scroll">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Rating</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && restaurants.length === 0 && (
            <TableRow>
              <TableCell colSpan="5">
                <div className="flex items-center justify-center flex-col">
                  <p className="text-orange-500">No restaurants found</p>
                  <Image src={error} alt="error" className="h-80 w-80" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {loading
            ? skeletonRows
            : restaurants.map((restaurant) => (
                <TableRow key={restaurant.email}>
                  <TableCell>{restaurant.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <MdEmail className="w-5 h-5 text-gray-500" />
                      {restaurant.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <FaStar className="w-5 h-5 text-yellow-500" />
                      {restaurant.rating}
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/restaurants/${restaurant._id}`}>
                      <IoEye className="w-6 h-6 text-gray-500" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">{paginationNumbers}</div>
    </div>
  );
};

export default RestaurantsList;
