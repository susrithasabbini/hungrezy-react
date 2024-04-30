import { Link } from "react-router-dom";

const CustomerLink = ({ to, icon, text, isCustomerOpen }) => (
  <Link
    to={to}
    className={`${
      isCustomerOpen ? "text-orange-500 bg-orange-50" : "text-gray-500"
    } hover:bg-gray-100 w-full px-4 transition-colors duration-300 hover:opacity-80 flex items-center gap-x-4 py-[10px] rounded-md cursor-pointer`}
  >
    {icon}
    <span className="text-sm">{text}</span>
  </Link>
);

export default CustomerLink;
