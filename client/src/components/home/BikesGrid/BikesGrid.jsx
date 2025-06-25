import { useEffect } from "react";
import { useBikeStore } from "../../../store/useBikeStore";
import BikeCard from "./BikeCard";

function BikesGrid() {
  const { bikes, fetchAllBikes, isLoading } = useBikeStore();
  console.log("Bikes:", bikes);
  useEffect(() => {
    fetchAllBikes();
  }, [fetchAllBikes]);
  const onRentClick = (bike) => {
    console.log("Renting bike with:",bike);
    // console.log(`Bike ID: ${bike._id}, Location: ${bike.location}`);
  };
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-purple-100 rounded-2xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Bikes</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading bikes...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike._id} bike={bike} onRentClick={onRentClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BikesGrid;
