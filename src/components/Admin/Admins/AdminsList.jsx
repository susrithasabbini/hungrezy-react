import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdEmail, MdPhone } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { BiShareAlt } from "react-icons/bi";
import { FaShareSquare } from "react-icons/fa";
import { toast } from "sonner";
import {
  Switch,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import AdminSkeleton from "./AdminSkeleton";

const AdminsList = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/admin/all`
      );
      const { data } = await response.json();
      setAdmins(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleToggle = async (adminId, isActive) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HUNGREZY_API}/api/admin/${adminId}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ active: isActive }),
        }
      );
      const { data } = await response.json();
      setAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === adminId ? { ...admin, active: isActive } : admin
        )
      );
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  const handleShareCredentials = async (adminId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_HUNGREZY_API
        }/api/admin/${adminId}/share-credentials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) toast.error("Unable to share credentials");
      else toast.success("Credentials shared successfully!");
      const { data } = await response.json();
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  return (
    <div className="px-4">
      <Table className="mt-4 h-[30rem] overflow-y-scroll">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && <AdminSkeleton />}

          {!loading &&
            admins.map((admin) => (
              <TableRow key={admin._id}>
                <TableCell>
                  {new Date(admin.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{`${admin.firstName} ${admin.lastName}`}</TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    <MdEmail className="w-5 h-5 text-gray-500" />
                    {admin.email}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-x-2">
                    {admin.superAdmin ? "Super Admin" : "Admin"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    <Link to={`/admin/admins/${admin._id}`}>
                      <IoEye className="w-6 h-6 text-gray-500" />
                    </Link>
                    <span
                      onClick={() => {
                        const shareConfirmation = window.confirm(
                          `Share credentials to ${admin.firstName} ${admin.lastName}?`
                        );
                        if (shareConfirmation) {
                          handleShareCredentials(admin._id);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <FaShareSquare className="w-5 h-5 text-gray-600 ml-2 mb-1" />
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={admin.active}
                    onChange={(isActive) => handleToggle(admin._id, isActive)}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminsList;
