import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [nights, setNights] = useState(0);
  

  useEffect(() => {
    fetch("/hotels.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedHotel = data.find((h) => h.id.toString() === id);
        setHotel(selectedHotel);
      })
      .catch((error) => console.error("Error fetching hotel:", error));
  }, [id]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const timeDiff = end.getTime() - start.getTime();
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setNights(dayDiff > 0 ? dayDiff : 0);
    }
  }, [checkInDate, checkOutDate]);

  if (!hotel) return <p>Loading hotel details...</p>;

  const pricePerNight = parseFloat(hotel.price); // Ensure price is a number
  const totalPrice = pricePerNight * nights;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
      <p>
        <strong>Location:</strong> {hotel.location}
      </p>
      <p>
        <strong>Price:</strong> ₹{hotel.price}/night
      </p>

      {/* Hotel Images */}
      {hotel.images?.[0] && (
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="my-4 w-full max-w-md rounded-lg"
        />
      )}

      {/* Date Inputs */}
      <div className="flex flex-col md:flex-row gap-4 my-4">
        <div>
          <label className="block font-medium">Check-in:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium">Check-out:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
      </div>

      {/* Pricing Summary */}
      {nights > 0 && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          <p>
            <strong>Duration:</strong> {nights} night{nights > 1 ? "s" : ""}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{totalPrice}
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelDetails;
