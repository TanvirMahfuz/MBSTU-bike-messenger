import { useEffect } from "react";
import { useBikeStore } from "../../store/useBikeStore";
import { MapPin, DollarSign, Clock } from "lucide-react";
import clsx from "clsx";

function BikesGrid() {
  const { bikes, fetchAllBikes, isLoading } = useBikeStore();

  useEffect(() => {
    fetchAllBikes();
  }, [fetchAllBikes]);

  const availabilityColors = {
    available: "bg-green-100 text-green-700",
    rented: "bg-yellow-100 text-yellow-700",
    inMaintenance: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Bikes</h1>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading bikes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span
                  className={clsx(
                    "text-xs font-semibold px-3 py-1 rounded-full",
                    availabilityColors[bike.availability]
                  )}>
                  {bike.availability}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(bike.createdAt).toLocaleDateString()}
                </span>
              </div>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BikesGrid;
