import { FaChevronRight } from "react-icons/fa6";

const Skeleton = () => {
  return (
    <div className="px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">View Customer</h1>
        <div className="flex items-center py-3 gap-2 mx-2">
          <p>Admin</p>
          <span>
            <FaChevronRight className="text-gray-500" />
          </span>
          <p className="text-orange-500 underline">Customer</p>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col items-center my-4">
        <div className="lg:flex-[3]">
          <div className="bg-gray-200 w-[20rem] animate-pulse h-[20rem] md:w-[18rem] md:h-[18rem] xl:w-[20rem] xl:h-[20rem] rounded-full"></div>
        </div>

        <div className="border rounded p-4 items-center my-4 justify-center lg:flex-[5] md:w-[40rem] w-[20rem]">
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Text Skeletons */}
            <div className="animate-pulse flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-24 h-4"></div>
                <div className="bg-gray-200 w-24 h-4"></div>
              </div>
            </div>
            <div className="animate-pulse flex flex-col">
              <div className="flex justify-between mb-2">
                <div className="bg-gray-200 w-28 h-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden border border-gray-200 rounded-md">
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
            {/* Table Skeleton */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Skeleton;
