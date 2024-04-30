import React, { useEffect } from "react";
import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import {
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import error from "../../../assets/error.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "sonner";

const AdminQueries = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [state, setState] = useState(null);
  const [queriesData, setQueriesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleModal = async (id, state) => {
    setState(state);
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/contact/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: state }),
    });
    const result = await response.json();
    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      return;
    }
    toast.success(result.message);
    fetchQueries();
  };

  useEffect(() => {
    fetchQueries();
  }, [statusFilter, typeFilter, state]);

  const fetchQueries = async () => {
    const url = `${import.meta.env.VITE_HUNGREZY_API}/api/contact/`;
    const response = await fetch(url);
    const result = await response.json();
    if (response.ok) {
      setQueriesData(result.data);
      setLoading(false);
    }
  };

  const filteredQueries = queriesData.filter((query) => {
    if (
      (!statusFilter || statusFilter === "all") &&
      (!typeFilter || typeFilter === "all")
    ) {
      return true;
    }

    let statusCondition =
      !statusFilter || statusFilter === query.status || statusFilter === "all";

    let typeCondition =
      !typeFilter || typeFilter === query.subject || typeFilter === "all";

    return statusCondition && typeCondition;
  });

  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">Queries</h1>
        <div className="flex items-center py-2.5 gap-2 mx-2">
          <p>Admin</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Queries</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row items-center mt-6">
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-500">Status:</p>
          <Select
            className="w-24 ml-2"
            placeholder="Status"
            value={statusFilter}
            onValueChange={setStatusFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer" defaultChecked>
              All
            </SelectItem>
            <SelectItem value="in-progress" className="cursor-pointer">
              In Progress
            </SelectItem>
            <SelectItem value="resolved" className="cursor-pointer">
              Resolved
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center">
          <p className="text-sm font-semibold text-gray-500">Type:</p>
          <Select
            className="w-32 ml-2"
            placeholder="Type"
            value={typeFilter}
            onValueChange={setTypeFilter}
            defaultValue="all"
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            <SelectItem value="general" className="cursor-pointer">
              General
            </SelectItem>
            <SelectItem value="technical" className="cursor-pointer">
              Technical
            </SelectItem>
            <SelectItem value="other" className="cursor-pointer">
              Other
            </SelectItem>
          </Select>
        </div>
      </div>

      {filteredQueries.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center">
          <Image src={error} alt="error" />
          <p className="text-sm font-semibold text-gray-600 mt-4">
            No queries found
          </p>
        </div>
      )}

      {filteredQueries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6 pb-4">
          {filteredQueries.map((query) => (
            <div key={query._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-500">
                  {query.subject === "general"
                    ? "General"
                    : query.subject === "technical"
                    ? "Technical"
                    : "Other"}
                </h2>
                <p
                  className={`text-sm font-semibold ${
                    query.status === "resolved"
                      ? "text-green-500"
                      : query.status === "in-progress"
                      ? "text-blue-500"
                      : "text-orange-500"
                  }`}
                >
                  {query.status}
                </p>

                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<BsThreeDotsVertical />}
                    variant="outline"
                    size="sm"
                  />
                  <MenuList>
                    {query.status !== "resolved" && (
                      <MenuItem
                        onClick={() => toggleModal(query._id, "resolved")}
                      >
                        Mark as Resolved
                      </MenuItem>
                    )}
                    {query.status === "resolved" && (
                      <MenuItem
                        onClick={() => toggleModal(query._id, "in-progress")}
                      >
                        Mark as In Progress
                      </MenuItem>
                    )}
                  </MenuList>
                </Menu>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">{query.name}</p>
                <p className="text-sm text-gray-600">{query.email}</p>
              </div>
              <p className="text-sm text-gray-600">{query.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQueries;
