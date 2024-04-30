import { BadgeCheckIcon } from "@heroicons/react/outline";
import { Badge, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { BiSolidFoodMenu } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiQuestionFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import ConfirmationModal from "./ConfirmationModal";
import OrdersTable from "./OrdersTable";

const CustomerDetails = () => {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const handleDone = () => {
    fetchCustomerDetails(id);
  };

  useEffect(() => {
    setLoading(true);
    fetchCustomerDetails(id);
    setLoading(false);
  }, [id]);

  const toggleModal = async (status) => {
    setOpenModal(!openModal);
    setStatus(status);
  };

  const fetchCustomerDetails = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_HUNGREZY_API}/api/user/${id}`
    );
    if (!response.ok) {
      setCustomer(null);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    setCustomer(result.data);
  };

  if (loading || !customer) {
    return <Skeleton />;
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">View Customer</h1>
        <div className="flex items-center py-3 gap-3 mx-2">
          <div className="flex items-center gap-2">
            <p>Admin</p>
            <span>
              <FaChevronRight className="text-gray-500" />
            </span>
            <p className="text-orange-500 underline">Customer</p>
          </div>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical color="gray" className="w-4 h-4" />}
              variant="outline"
              className="bg-gray-200"
              borderRadius={"50%"}
              size={"md"}
            />
            <MenuList>
              {customer?.status === "active" && (
                <MenuItem onClick={() => toggleModal("inactive")}>
                  Deactivate
                </MenuItem>
              )}
              {customer?.status === "inactive" && (
                <MenuItem onClick={() => toggleModal("active")}>
                  Activate
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          openModal={openModal}
          toggleModal={toggleModal}
          customerId={customer._id}
          status={status}
          handleDone={handleDone}
        />
      )}
      <div className="flex lg:flex-row flex-col items-center my-4">
        <div className="lg:flex-[3]">
          <img
            src={customer?.image}
            alt={customer?.name}
            className="xl:h-[20rem] xl:w-[20rem] md:h-[18rem] md:w-[18rem] w-[25rem] h-[25rem] rounded-full"
          />
        </div>

        <div className="border rounded p-4 items-center mt-4 justify-center lg:flex-[5] md:w-[40rem] w-[20rem]">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <BiSolidFoodMenu className="mr-2" />
                  Name:
                </p>
                <p className="text-gray-700">
                  {customer?.firstName} {customer?.lastName}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <MdEmail className="mr-2" />
                  Email:
                </p>
                <p className="text-gray-700">{customer?.email}</p>
              </div>

              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <MdPhone className="mr-2" />
                  Mobile Number:
                </p>
                <p className="text-gray-700">{customer?.mobileNumber}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between mb-2">
                <p className="text-gray-500 flex items-center">
                  <RiQuestionFill className="mr-2" />
                  Status:
                </p>
                {customer?.status && (
                  <Badge
                    className="px-3 py-1 flex items-center w-28"
                    color={customer.status === "active" ? "green" : "red"}
                    icon={
                      customer.status === "active" ? BadgeCheckIcon : RxCross2
                    }
                  >
                    <Text>
                      {customer.status.charAt(0).toUpperCase() +
                        customer.status.slice(1)}
                    </Text>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xl font-medium px-4">Orders</p>
      <OrdersTable customerId={id} />
    </div>
  );
};

export default CustomerDetails;
