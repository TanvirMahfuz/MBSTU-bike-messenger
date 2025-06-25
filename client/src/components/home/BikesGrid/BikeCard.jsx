import { MapPin, DollarSign, Clock } from "lucide-react";
import clsx from "clsx";

const availabilityColors = {
  available: "bg-green-100 text-green-800",
  rented: "bg-yellow-100 text-yellow-800",
  unavailable: "bg-red-100 text-red-800",
};

function BikeCard({ bike, onRentClick, className = "" }) {
  return (
    <div
      key={bike._id}
      className={clsx(
        "bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 space-y-4",
        className
      )}>
      {/* Header with status and date */}
      <div className="flex justify-between items-center">
        <span
          className={clsx(
            "text-xs font-semibold px-3 py-1 rounded-full",
            availabilityColors[bike.availability] || "bg-gray-100 text-gray-600"
          )}>
          {bike.availability}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(bike.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Bike Info */}
      <div className="space-y-1 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-500" />
          {bike.location}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-green-600" />
          {bike.minuteRate.toFixed(2)} BDT/min
        </div>
        {bike.user && (
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            Currently rented
          </div>
        )}
      </div>

      {/* Action Button */}
      <div className="w-full">
        <button
          onClick={() => onRentClick(bike)}
          className="w-full bg-sky-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Rent
        </button>
      </div>
    </div>
  );
}

export default BikeCard;
