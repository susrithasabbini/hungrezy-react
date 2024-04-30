import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import Counter from "../../Counter";
import Graphs from "./Graphs";

const LoadingSkeleton = () => (
  <div className="border-1 rounded-md animate-pulse items-center justify-center gap-y-3 p-3 flex flex-col">
    <div className="h-10 w-20 bg-gray-200 rounded-md"></div>
    <div className="h-8 w-16 bg-gray-200 rounded-md"></div>
  </div>
);

const AdminDashboard = () => {
  const [totalCustomers, setTotalCustomers] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalRestaurants, setTotalRestaurants] = useState(null);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const [loadingCustomers, setLoadingCustomers] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [restaurants, setRestaurants] = useState([
    {
      name: "approved",
      value: 0,
    },
    {
      name: "suspended",
      value: 0,
    },
    {
      name: "inprogress",
      value: 0,
    },
    {
      name: "rejected",
      value: 0,
    },
  ]);
  const [customers, setCustomers] = useState([
    {
      name: "active",
      value: 0,
    },
    {
      name: "inactive",
      value: 0,
    },
  ]);

  useEffect(() => {
    fetchRestaurants();
    fetchCustomers();
    fetchOrders();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoadingRestaurants(true);
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/restaurant/count`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      const { approved, suspended, inprogress, rejected, total } = result.data;
      setTotalRestaurants(total);

      // Update the state with the extracted counts
      setRestaurants([
        {
          name: "approved",
          value: approved,
        },
        {
          name: "suspended",
          value: suspended,
        },
        {
          name: "inprogress",
          value: inprogress,
        },
        {
          name: "rejected",
          value: rejected,
        },
      ]);
      setLoadingRestaurants(false);
    } catch (error) {
      console.error("Error fetching restaurants count:", error);
      setLoadingRestaurants(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/user/count`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const { inActiveUsers, activeUsers, totalUsers } = result.data;
      setTotalCustomers(totalUsers);
      setCustomers([
        {
          name: "active",
          value: activeUsers,
        },
        {
          name: "inactive",
          value: inActiveUsers,
        },
      ]);

      setLoadingCustomers(false);
    } catch (error) {
      console.error("Error fetching customers count:", error);
      setLoadingCustomers(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/order/count`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      const { totalOrders } = result.data;
      setTotalOrders(totalOrders);
      setLoadingOrders(false);
    } catch (error) {
      console.error("Error fetching orders count:", error);
      setLoadingOrders(false);
    }
  };

  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <div className="flex items-center py-2.5 gap-2 mx-2">
          <p>Admin</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Dashboard</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        {/* Customers Card */}
        {loadingCustomers || totalCustomers === null ? (
          <LoadingSkeleton />
        ) : (
          <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
            <Counter to={totalCustomers} />
            <p className="text-lg font-medium">Customers</p>
          </div>
        )}

        {/* Restaurants Card */}
        {loadingRestaurants || totalRestaurants === null ? (
          <LoadingSkeleton />
        ) : (
          <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
            <Counter to={totalRestaurants} />
            <p className="text-lg font-medium">Restaurants</p>
          </div>
        )}

        {/* Orders Card */}
        {loadingOrders || totalOrders === null ? (
          <LoadingSkeleton />
        ) : (
          <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
            <Counter to={totalOrders} />
            <p className="text-lg font-medium">Orders</p>
          </div>
        )}
      </div>

      <Graphs
        customers={customers}
        restaurants={restaurants}
        loading={loadingRestaurants || loadingCustomers}
      />
    </div>
  );
};

export default AdminDashboard;
