
import React from "react";

const BookNowCard = ({ checkIn, checkOut, pricePerNight, guests }) => {
  const getNumberOfNights = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = getNumberOfNights(checkIn, checkOut);
  const totalPrice = nights * pricePerNight;
  const isValidBooking = checkIn && checkOut && nights > 0;

  const handleBookNow = () => {
    if (!isValidBooking) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    console.log("Booking Confirmed ✅", {
      checkIn,
      checkOut,
      nights,
      guests,
      totalPrice,
    });
  };

  return (
    <div className="border p-4 rounded-xl shadow-md sticky top-24 w-full max-w-sm bg-white">
      <div className="text-xl font-semibold mb-4">₹{pricePerNight} / night</div>
      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
        <div className="border p-2 rounded">
          <label className="block text-gray-500 text-xs">Check-in</label>
          <p>{checkIn || "Select"}</p>
        </div>
        <div className="border p-2 rounded">
          <label className="block text-gray-500 text-xs">Check-out</label>
          <p>{checkOut || "Select"}</p>
        </div>
      </div>
      <div className="border p-2 rounded mb-4 text-sm">
        <label className="block text-gray-500 text-xs">Guests</label>
        <p>{guests.adults + guests.children} guests</p>
      </div>
      <button
        onClick={handleBookNow}
        className="bg-rose-500 text-white w-full py-2 rounded font-semibold hover:bg-rose-600"
      >
        Book Now
      </button>
      {isValidBooking && (
        <div className="mt-4 text-sm text-gray-600">
          <p>{nights} nights × ₹{pricePerNight} = ₹{totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default BookNowCard;
