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
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { MdEmail, MdPhone } from "react-icons/md";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { RxCross2 } from "react-icons/rx";

const CustomersList = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchCustomers();
  }, [dateFilter, statusFilter]);

  const fetchCustomers = async () => {
    setLoading(true);
    let url = `${import.meta.env.VITE_HUNGREZY_API}/api/user/all`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: dateFilter,
        status: statusFilter,
      }),
    });

    const result = await response.json();
    setCustomers(result.data);
    setLoading(false);
  };

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
      <TableCell>
        <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Customers List</h1>
        <div className="flex items-center py-2.5 gap-2 mx-2">
          <p>Admin</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Customers List</p>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-y-5 items-center mt-2 sm:gap-x-5">
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
            Status: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Status"
            value={statusFilter}
            onValueChange={setStatusFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="active" className="cursor-pointer">
              Active
            </SelectItem>
            <SelectItem value="inactive" className="cursor-pointer">
              Inactive
            </SelectItem>
          </Select>
        </div>
      </div>
      <Table className="mt-4 h-[30rem] overflow-y-scroll">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Mobile Number</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading
            ? skeletonRows
            : customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{new Date(customer.createdAt).toDateString()}</TableCell>
                  <TableCell>
                    {customer.firstName + " " + customer.lastName}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <MdEmail className="w-5 h-5 text-gray-500" />
                      {customer.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2">
                      <MdPhone className="w-5 h-5 text-gray-500" />
                      {customer.mobileNumber}
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/customers/${customer._id}`}>
                      <IoEye className="w-6 h-6 text-gray-500" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomersList;
