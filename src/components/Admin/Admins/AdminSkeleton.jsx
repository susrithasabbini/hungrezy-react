import { TableCell, TableRow } from "@tremor/react";

const AdminSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map((index) => (
        <TableRow key={index}>
          <TableCell>
            <div className="animate-pulse bg-gray-200 h-4 w-16 rounded-full"></div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 h-4 w-24 rounded-full"></div>
            </div>
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-200 h-4 w-24 rounded-full"></div>
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-200 h-4 w-24 rounded-full"></div>
          </TableCell>
          <TableCell>
            <div className="flex items-center gap-x-2">
              <div className="animate-pulse bg-gray-200 h-4 w-6 rounded-full"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-6 rounded-full"></div>
            </div>
          </TableCell>
          <TableCell>
            <div className="animate-pulse bg-gray-200 h-4 w-12"></div>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default AdminSkeleton;
