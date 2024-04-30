// OrdersList.js

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../redux/slices/ordersSlice';
import { useAuth } from "../../AuthContext";
import { format } from 'date-fns';
import { MdOutlineFoodBank } from "react-icons/md";
import { MdDeliveryDining } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegCaretSquareUp } from "react-icons/fa";
import { GrSquare } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa";
import {toast} from 'sonner';



const OrderCard = ({ order }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {accessToken} = useAuth()
  const handleCancelOrder = async() => {
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/order/user/cancel/${order._id}`;
    try{
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
      });
      if (!response.ok) {
        console.log('Failed to cancel order');
        toast.error(`Unable to cancel Order ${order._id}`)
        return;
      }
      toast.success(`Your order ${order._id} was cancelled successfully!`);
      order.status = "cancelled";
      setIsMenuOpen(false);
    }catch(error){
      console.log(error)
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full mb-4 relative">
      <div className="border-2 border-dotted px-4 py-2 flex justify-between items-center">
        <div>
          <h2 className="text font-bold text-gray-700 mt-1.5">{`${order.restaurantId.name}`}</h2>
          <p className="font-semibold text-gray-600 text-xs mt-1">{`Order ID: ${order._id}`}</p>
        </div>
        <div className='flex'>
          <div className='mr-5'>
            {
              order.status=='placed' && 
              <div className='text py-1 px-2 rounded-md bg-orange-200 border-2 border-orange-400 text-gray-500'>
                <MdOutlineFoodBank className='inline mr-1'/>
                placed
              </div>
            }
            {
              order.status=='processing' && 
              <div className='text py-1 px-2 rounded-md bg-green-200 border-2 border-green-400 text-gray-500'>
                <MdDeliveryDining className='inline mr-1'/>
                on the way!
              </div>
            }
            {
              order.status=='delivered' && 
              <div className='text py-1 px-2 rounded-md bg-green-500 text-white'>
                <IoCheckmarkDoneSharp className='inline mr-1'/>
                delivered
              </div>
            }
            {
              order.status=='cancelled' && 
              <div className='text py-1 px-2 rounded-md bg-red-500 text-white'>
                cancelled
              </div>
            }
          </div>
          <button className="focus:outline-none" onClick={handleMenuToggle}>
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute right-6 top-0 mt-16 bg-white border border-gray-200 shadow-md rounded-md py-1 w-40 z-10">
              <a href={`/restaurant/${order.restaurantId._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Go to Menu</a>
              <a href={`/restaurant/${order.restaurantId._id}?show=reviews&orderId=${order._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Write Review</a>
              <div className='flex justify-center my-1'>
                { order.status !== 'delivered' && order.status!='cancelled' && (
                  <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2" onClick={handleCancelOrder}>Cancel Order</button>
                )}
              </div>
            </div>
          )}
        </div>
       
      </div>
      <div className="px-4 py-4 max-h-40 overflow-y-auto">
        {order.foodItems.map((item, index) => (
          <div key={index} className="flex justify-between">
           <div className='flex'>
              {item.veg_or_non_veg == "Veg" ? (
                  <GrSquare className="text-green-700 mt-1" />
                ) : (
                  <FaRegCaretSquareUp className="text-red-500 mt-1" />
              )}
            <p className='ml-2'>{`${item.name} x ${item.quantity}`}</p>
           </div>
            <p><FaRupeeSign className='inline text-gray-500 text-sm '/>{`${item.price}`}</p>
          </div>
        ))}
      </div>
      <div className="border-t-2 border-gray-300 border-dashed px-4 py-3 flex justify-between items-center">
        <p>{`Ordered At: ${format(new Date(order.orderedAt), 'MMM dd, yyyy hh:mm:ss a')}`}</p>
        <p>Total : Rs {order.paymentDetails.amount}</p>
      </div>
    </div>
  );
};


const OrdersList = () => {
  //const orders = useSelector(selectOrders);
  const {user,accessToken,loading} = useAuth()
  const [orders,setOrders] = useState([])
  const fetchUserOrders = async(userId,status)=>{
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/order/user/${userId}?status=${status}`;
    try{
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
      });
      if (!response.ok) {
        console.log('Failed to fetch user orders');
        return [];
      }
      const result = await response.json();
      console.log(result)
      if(!result.data)return []
      return result.data
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    const fetchData = async () => {
      if (user) {
        const data = await fetchUserOrders(user._id, 'all');
        setOrders(data);
      }
    };
    fetchData();
  },[user])
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl text-gray-700 font-semibold mb-4">My Orders</h2>
      {orders.length>0 && orders.map(order => (
        <OrderCard key={order._id} order={order} /> 
      ))}
    </div>
  );
};

export default OrdersList;
