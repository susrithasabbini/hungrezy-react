import { Image } from "@chakra-ui/react";
import { BadgeCheckIcon } from "@heroicons/react/outline";
import { Badge, Select, SelectItem, Text } from "@tremor/react";
import { useState } from "react";
import { RiDraftLine } from "react-icons/ri";
import error from "../../../assets/error.png";

const MenuItemsTable = ({ Menu }) => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredMenuItems = Menu.filter((menuItem) => {
    if (
      (!statusFilter || statusFilter === "all") &&
      (!categoryFilter || categoryFilter === "all")
    ) {
      return true;
    }

    if (!statusFilter && categoryFilter) {
      return menuItem.category.toLowerCase().includes(categoryFilter);
    }
    const statusMatch =
      statusFilter === "all" ||
      menuItem.available === (statusFilter === "published");

    const categoryMatch =
      categoryFilter === "all" ||
      menuItem.category.toLowerCase().includes(categoryFilter);

    return statusMatch && categoryMatch;
  });

  const categories = [...new Set(Menu.map((menuItem) => menuItem.category))];

  return (
    <div className="px-4">
      <div className="flex sm:flex-row flex-col gap-y-5 items-center mt-2 sm:gap-x-5">
        <div className="flex items-center gap-2">
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
            <SelectItem value="all" className="cursor-pointer" defaultChecked>
              All
            </SelectItem>
            <SelectItem value="published" className="cursor-pointer">
              Published
            </SelectItem>
            <SelectItem value="draft" className="cursor-pointer">
              Draft
            </SelectItem>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-500 pt-3">
            Category: &nbsp;
          </p>
          <Select
            className="w-[10rem]"
            placeholder="Category"
            defaultValue="all"
            onValueChange={setCategoryFilter}
            value={categoryFilter}
          >
            <SelectItem value="all" className="cursor-pointer">
              All
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem
                key={cat}
                value={cat.toLowerCase()}
                className="cursor-pointer"
              >
                {cat}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
      {filteredMenuItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center my-20">
          <p className="text-orange-600 text-base font-semibold text-center">
            No Menu Items Found
          </p>
          <Image src={error} alt="No Menu" />
        </div>
      ) : (
        <div className="overflow-scroll border border-gray-200 rounded-md h-[30rem] mb-10 mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Available
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMenuItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    &#8377; {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.available ? (
                      <Badge
                        className="px-3 py-1 flex items-center w-28"
                        color="green"
                        icon={BadgeCheckIcon}
                      >
                        <Text>Available</Text>
                      </Badge>
                    ) : (
                      <Badge
                        className="px-3 py-1 flex items-center w-28"
                        color="gray"
                        icon={RiDraftLine}
                      >
                        <Text>Draft</Text>
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MenuItemsTable;
