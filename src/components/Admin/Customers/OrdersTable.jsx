import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { Badge, Select, SelectItem, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { RiDraftLine } from "react-icons/ri";
import error from "../../../assets/error.png";
import Skeleton from "./Skeleton";
import { toast } from "sonner";
import { IoEye } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdFoodBank, MdOutlinePending } from "react-icons/md";

const OrdersTable = ({ customerId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetchOrders();
    setLoading(false);
  }, [customerId, statusFilter]);

  const fetchOrders = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_HUNGREZY_API
      }/api/order/user/${customerId}?status=${statusFilter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      toast.error("Failed to fetch orders");
      setOrders([]);
      return;
    }
    const result = await response.json();
    setOrders(result.data);
  };

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="px-4">
      <div className="flex sm:flex-row flex-col gap-y-5 items-center sm:gap-x-5">
        <div className="flex items-center gap-2 my-4">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Status: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Status"
            defaultValue="all"
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectItem className="cursor-pointer" value="all">
              All
            </SelectItem>
            <SelectItem className="cursor-pointer" value="processing">
              Processing
            </SelectItem>
            <SelectItem className="cursor-pointer" value="placed">
              Placed
            </SelectItem>
            <SelectItem className="cursor-pointer" value="delivered">
              Delivered
            </SelectItem>
            <SelectItem className="cursor-pointer" value="cancelled">
              Cancelled
            </SelectItem>
          </Select>
        </div>
      </div>

      {orders.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center">
          <Image src={error} alt="error" className="w-40 h-40" />
          <Text className="text-lg font-semibold mt-5">No orders found</Text>
        </div>
      ) : (
        <div className="flex flex-col gap-2 mb-10">
          {orders.map((order, id) => (
            <Accordion allowToggle key={id}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      <div className="flex items-center justify-between">
                        <p className="text-md font-semibold">
                          {order.restaurantId.name}
                        </p>

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
                      </div>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div>
                    {order.foodItems.map((item, id) => (
                      <div
                        key={id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex gap-3">
                            <p className="text-md font-normal">{item.name}</p>
                            <p className="text-gray-500">{item.quantity} x</p>
                          </div>
                        </div>
                        <p className="text-md font-semibold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
