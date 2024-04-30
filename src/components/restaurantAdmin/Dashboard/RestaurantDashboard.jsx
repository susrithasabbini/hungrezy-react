import { FaChevronRight } from "react-icons/fa";
import Counter from "../../Counter";
import Graphs from "./Graphs";
import { useEffect, useState } from "react";
import { useAuth } from "../../../AuthContext";

const RestaurantDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [newOrders, setNewOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [receivedOrders, setReceivedOrders] = useState(0);
  const [successfulOrders, setSuccessfulOrders] = useState(0);
  const {user,accessToken} = useAuth()

  const fetchRestaurantOrderStats = async(restaurantId)=>{
    let url = `${import.meta.env.VITE_HUNGREZY_API}/api/order/restaurant/stats/${restaurantId}`;
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
      });
      if (!response.ok) {
        console.log('Failed to fetch order stats');
        return null;
      }
      const result = await response.json();
      console.log(result)
      if(!result.data)return null
      return result.data
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      if (user) {
        const data = await fetchRestaurantOrderStats(user._id);
        if(data){
          setTotalRevenue(data.totalRevenue);
          setNewOrders(data.newOrders);
          setPendingOrders(data.processingOrders);
          setSuccessfulOrders(data.deliveredOrders);
          setReceivedOrders(data.totalOrders);
        }
      }
    };
    fetchData();
  },[])

  // useEffect(() => {
  //   let totalRevenue = 0;
  //   ordersData.forEach((order) => {
  //     if (order.status === "delivered") {
  //       totalRevenue += order.total;
  //     }
  //   });
  //   setTotalRevenue(totalRevenue);

  //   const newOrders = ordersData.filter((order) => order.status === "new");
  //   setNewOrders(newOrders.length);

  //   const pendingOrders = ordersData.filter(
  //     (order) => order.status === "pending"
  //   );
  //   setPendingOrders(pendingOrders.length);
  //   const receivedOrders = ordersData.length;
  //   setReceivedOrders(receivedOrders);

  //   const successfulOrders = ordersData.filter(
  //     (order) => order.status === "delivered"
  //   );
  //   setSuccessfulOrders(successfulOrders.length);
  // }, []);
  return (
    <div className="w-full px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Dashboard</h1>
        <div className="flex items-center py-2.5 gap-2 mx-5">
          <p>Restaurant</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Dashboard</p>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-6 grid-cols-1">
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={totalRevenue} />
          <p className="text-lg font-medium">Total Revenue</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={newOrders} />
          <p className="text-lg font-medium">New Orders</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={receivedOrders} />
          <p className="text-lg font-medium">Received Orders</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={8900} />
          <p className="text-lg font-medium">Reviews</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={pendingOrders} />
          <p className="text-lg font-medium">Pending Orders</p>
        </div>
        <div className="border-1 rounded-md items-center justify-center gap-y-3 p-3 flex flex-col hover:border-orange-500">
          <Counter to={successfulOrders} />
          <p className="text-lg font-medium">Successful Orders</p>
        </div>
      </div>

      <Graphs />
    </div>
  );
};

export default RestaurantDashboard;
