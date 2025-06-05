import React, { useState, useEffect } from "react";
import HotelSlider from "./HotelSlider";
import { useNavigate } from "react-router-dom";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/hotels.json") // from public folder
      .then((response) => response.json())
      .then((data) => setHotels(data))
      .catch((error) => console.error("Error loading hotels:", error));
  }, []);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (id) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div
  key={hotel.id}
  className="shadow-md rounded-lg overflow-hidden"
>
  <HotelSlider images={hotel.images} />
  <div className="p-4">
    <h4 className="text-lg font-semibold">{hotel.name}</h4>
    <p className="text-gray-600">{hotel.location}</p>
    <p className="text-gray-600">{hotel.price}</p>

    {/* View Details Button */}
    <button
      onClick={() => handleViewDetails(hotel.id)}
      className="mt-6 px-10 py-1 bg-red-600 text-white rounded hover:bg-red-700"
    >
      View Details
    </button>
  </div>
</div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No hotels found.</p>
        )}
      </div>
    </div>
  );
};

export default HotelList;
