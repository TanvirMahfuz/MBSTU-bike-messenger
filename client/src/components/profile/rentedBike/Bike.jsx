import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { Clock } from "lucide-react";
function Bike({bike}) {
  return (
    <div
      key={bike._id}
      className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-blue-50 to-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full max-w-4xl mx-auto mt-8">
      {/* Left Content */}
      <div className="flex-1 space-y-3 text-gray-800">
        <h3 className="text-2xl font-bold text-blue-700">
          🚲 Bike Rental Info
        </h3>
        <p>
          <span className="font-medium">Started at:</span>{" "}
          <span className="text-gray-700">
            {format(new Date(bike.startDate), "PPPpp")}
          </span>
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4 text-yellow-500" />{" "}
          {formatDistanceToNow(new Date(bike.startDate), { addSuffix: true })}
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition duration-200">
          Return Bike
        </button>
      </div>

      {/* Image */}
      {bike.bike.image && (
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={bike.bike.image || "/placeholder-bike.png"}
            alt="Rented Bike"
            className="rounded-xl object-cover h-48 w-full shadow-md"
          />
        </div>
      )}
    </div>
  );
}

export default Bike;
