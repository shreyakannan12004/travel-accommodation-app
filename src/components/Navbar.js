import React, { useState } from "react";
import { FaHotel, FaStar, FaSwimmer, FaBed, FaTree, FaMountain, FaHome, FaStreetView } from "react-icons/fa";
import { SlSettings } from "react-icons/sl"; // Filters icon
import { IoClose } from "react-icons/io5"; // Close button icon

const categories = [
  { name: "Rooms", icon: <FaHotel /> },
  { name: "Icons", icon: <FaStar /> },
  { name: "Off-the-grid", icon: <FaMountain /> },
  { name: "Amazing pools", icon: <FaSwimmer /> },
  { name: "Luxe", icon: <FaHome /> },
  { name: "Bed & breakfasts", icon: <FaBed /> },
  { name: "Farms", icon: <FaTree /> },
  { name: "Amazing Views", icon: <FaStreetView /> },
];

const Navbar = () => {
  const [showFilters, setShowFilters] = useState(false); // Controls modal visibility
  const [showTaxes, setShowTaxes] = useState(false); // Toggle for "Before Taxes"

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center overflow-x-auto whitespace-nowrap px-6 py-3 space-x-11">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-black">
            <div className="text-xl">{category.icon}</div>
            <span className="text-sm">{category.name}</span>
          </div>
        ))}

        {/* Filters Button & Toggle Switch for Before Taxes */}
        <div className="ml-auto flex items-center space-x-3">
          <button
            className="flex items-center px-5 py-2 border rounded-lg text-sm shadow-sm"
            onClick={() => setShowFilters(true)}
          >
            <SlSettings className="mr-2" />
            Filters
          </button>

          {/* Toggle Switch for Displaying "Before Taxes" */}
          <div className="flex items-center space-x-2 border px-4 py-1.5 rounded-lg shadow-sm">
            <span className="text-sm text-gray-700">Display total before taxes</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={showTaxes}
                onChange={() => setShowTaxes(!showTaxes)}
              />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black transition-all relative">
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    showTaxes ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
