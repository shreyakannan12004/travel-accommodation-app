import React from "react";

const StickyCard = () => {
  return (
    <div className=" top-20 z-50">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900">Become a Host</h2>
        <p className="text-gray-600">
          Earn extra income and unlock new opportunities by sharing your space.
        </p>
        <button className="bg-red-500 text-white font-semibold px-4 py-2 mt-4 rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
};

export default StickyCard;
