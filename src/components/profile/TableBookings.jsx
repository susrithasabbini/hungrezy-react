// TableBookings.js
import React from "react";
import { useSelector } from "react-redux";

const TableBookings = () => {
  const bookings = useSelector((state) => state.tableBooking.bookings);

  return (
    <div className="flex flex-wrap justify-center">
      {bookings.map((booking, index) => (
        <div
          key={index}
          className="w-full mx-4 my-4 bg-white p-4 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">Table Booking Details</h2>
          <div className="mb-2">
            <strong>Guests:</strong> {booking.guests}
          </div>
          <div className="mb-2">
            <strong>Date:</strong> {booking.date}
          </div>
          <div className="mb-2">
            <strong>Time:</strong>{" "}
            {booking.time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="mb-2">
            <strong>Name:</strong> {booking.user.firstName}{" "}
            {booking.user.lastName}
          </div>
          <div className="mb-2">
            <strong>Restaurant:</strong> {booking.restaurantName}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {booking.restaurantAddress}
          </div>
        </div>
      ))}
      {bookings.length === 0 && <p>No bookings</p>}
    </div>
  );
};

export default TableBookings;
