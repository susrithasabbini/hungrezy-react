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
import { MdOutlinePending } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { ordersData } from "../../../data/orderItems";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { HiMiniBolt } from "react-icons/hi2";
import { useAuth } from "../../../AuthContext";
import { format } from "date-fns";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import Counter from "../../Counter";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState(null);
  const { user, accessToken, loading } = useAuth();
  const emptyStats = {
    totalOrders: 0,
    averageRevenuePerOrder: 0,
    totalRevenue: 0,
    mostFrequentCategory: ["none"],
    mostFrequentFoodItem: ["none"],
  };
  const [stats, setStats] = useState(emptyStats);

  const fetchRestaurantOrders = async (restaurantId, status, customerId) => {
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/order/restaurant/${restaurantId}?status=${status}`;
    if (customerId) url += `&cutomerId=${customerId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("Failed to fetch orders");
        return [];
      }
      const result = await response.json();
      console.log(result);
      if (!result.data) return [];
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurantOrdersStats = async (
    restaurantId,
    status,
    date,
    customerId
  ) => {
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/order/restaurant/stats/filters/${restaurantId}?status=${status}&date=${date}&customerId=${customerId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        console.log("Failed to fetch orders stats");
        return emptyStats;
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      const data = await fetchRestaurantOrdersStats(
        user._id,
        statusFilter,
        dateFilter,
        customerFilter
      );
      setStats(data);
    };
    fetchStats();
  }, [statusFilter, dateFilter, customerFilter]);

  console.log(stats);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await fetchRestaurantOrders(user._id, "all", null);
        const temp = [];
        setOrders(data);
      }
    };
    if (!orders.length > 0) fetchData();
  }, []);

  useEffect(() => {
    const uniqueCustomersMap = new Map();
    orders.forEach((order) => {
      const userIdString = order.userId._id;
      if (!uniqueCustomersMap.has(userIdString)) {
        uniqueCustomersMap.set(userIdString, order.userId);
      }
    });
    setCustomers(Array.from(uniqueCustomersMap.values()));
  }, [orders]);

  const handleUpdateStatus = async (orderId, status) => {
    const result = await updateOrderStatus(orderId, status);
    if (!result) return;
    const orderIndex = orders.findIndex((order) => order._id === orderId);
    const newOrders = [...orders];
    newOrders[orderIndex].status = status;
    setOrders(newOrders);
  };

  const updateOrderStatus = async (orderId, status) => {
    let url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/order/status/${orderId}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        console.log("Failed to update order status");
        toast.error("Failed to update order status");
        return false;
      }
      const result = await response.json();
      toast.success("Order status updated successfully");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
      return false;
    }
  };

  // useEffect(() => {
  //   setOrders(ordersData);
  // }, [statusFilter, dateFilter, orders]);

  const filteredOrders = orders.filter((order) => {
    if (
      (!statusFilter || statusFilter === "all") &&
      (!dateFilter || dateFilter === "all") &&
      (!customerFilter || customerFilter === "all")
    ) {
      return true;
    }

    const statusCondition =
      !statusFilter || statusFilter === order.status || statusFilter === "all";
    const customerCondition =
      !customerFilter ||
      customerFilter === order.userId._id ||
      customerFilter === "all";
    const orderDate = new Date(order.orderedAt);
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
          statusCondition &&
          customerCondition &&
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        );
      case "last-week":
        return statusCondition && customerCondition && orderDate >= lastWeek;
      case "last-month":
        return statusCondition && customerCondition && orderDate >= lastMonth;
      case "last-year":
        return statusCondition && customerCondition && orderDate >= lastYear;
      default:
        return statusCondition && customerCondition;
    }
  });

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Orders</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Orders</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={stats.totalOrders} />
          <p className="text-lg font-medium">Total orders</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={stats.totalRevenue} />
          <p className="text-lg font-medium">Total Revenue</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={stats.averageRevenuePerOrder} />
          <p className="text-lg font-medium">ARPO</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <p className="text-lg font-medium text-orange-600">
            {stats.mostFrequentCategory[0]}
          </p>
          <p className="text-lg font-medium">Frequent Category</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <p className="text-lg font-medium text-orange-600">
            {stats.mostFrequentFoodItem[0]}
          </p>
          <p className="text-lg font-medium">Frequent Food Item</p>
        </div>``
      </div>
      <div className="flex sm:flex-row flex-col gap-y-5 items-center mt-14 sm:gap-x-5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Status: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Status"
            value={statusFilter}
            onValueChange={setStatusFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer" defaultChecked>
              All
            </SelectItem>
            <SelectItem value="placed" className="cursor-pointer">
              New
            </SelectItem>
            <SelectItem value="delivered" className="cursor-pointer">
              Delivered
            </SelectItem>
            <SelectItem value="processing" className="cursor-pointer">
              Processing
            </SelectItem>
            <SelectItem value="cancelled" className="cursor-pointer">
              Cancelled
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Date: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
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
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Customer: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Customer"
            value={customerFilter}
            onValueChange={setCustomerFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer" defaultChecked>
              All
            </SelectItem>
            {customers &&
              customers.map((customer, id) => (
                <SelectItem
                  value={customer._id}
                  className="cursor-pointer"
                  key={id}
                >
                  {customer.firstName + " " + customer.lastName}
                </SelectItem>
              ))}
          </Select>
        </div>
      </div>
      <Table className="mt-4 h-[30rem] overflow-y-scroll">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Order ID</TableHeaderCell>
            <TableHeaderCell>Customer Name</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                {format(new Date(order.orderedAt), "MMM dd, yyyy, hh:mm:ss a")}
              </TableCell>
              <TableCell>{order._id}</TableCell>
              <TableCell>
                {order.userId.firstName + " " + order.userId.lastName}
              </TableCell>
              <TableCell>&#8377;{order.paymentDetails.amount}</TableCell>
              <TableCell>
                <Badge
                  className="px-3 py-1 flex items-center w-28"
                  color={
                    order.status === "delivered"
                      ? "green"
                      : order.status === "processing"
                      ? "yellow"
                      : order.status === "placed"
                      ? "blue"
                      : "red"
                  }
                  icon={
                    order.status === "delivered"
                      ? BadgeCheckIcon
                      : order.status === "processing"
                      ? MdOutlinePending
                      : order.status === "placed"
                      ? MdFoodBank
                      : RxCross2
                  }
                >
                  <Text>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Text>
                </Badge>
              </TableCell>

              <TableCell className="flex items-center justify-center lg:-ml-14 md:-ml-10">
                <div className="flex w-fit gap-3">
                  <Link
                    to={`/restaurant/orders/${order._id}`}
                    className="flex items-center justify-center rounded-md cursor-pointer underline"
                  >
                    <IoEye className="w-5 h-5 text-gray-500" />
                  </Link>
                  {order.status === "placed" && (
                    <Badge
                      onClick={() =>
                        handleUpdateStatus(order._id, "processing")
                      }
                      className="px-3 py-1 flex items-center w-28 cursor-pointer hover:scale-105 transition-all"
                      color={"green"}
                      icon={HiMiniBolt}
                    >
                      <Text>Accept</Text>
                    </Badge>
                  )}
                  {order.status === "processing" && (
                    <Badge
                      onClick={() => handleUpdateStatus(order._id, "delivered")}
                      className="px-3 py-1 flex items-center w-28 cursor-pointer hover:scale-105 transition-all"
                      color={"green"}
                      icon={BadgeCheckIcon}
                    >
                      <Text>Deliver</Text>
                    </Badge>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Orders;
