import { useEffect, useState } from "react";
import { useBikeStore } from "../../store/useBikeStore";
import { useUserStore } from "../../store/useUserStore";

function MyBike() {
  const { fetchBikeById, bike, error } = useBikeStore();
  const { authUser } = useUserStore();

  useEffect(() => {
    if (authUser?.bikes?.[0]) {
      fetchBikeById(authUser.bikes[0]);
    }
  }, [authUser]);

  return (
    <>
      {error && alert(error)}
      {bike ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-md p-6 w-full max-w-4xl mx-auto text-left">
          {/* Bike Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Your Bike</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <span className="font-medium">Location:</span> {bike.location}
              </li>
              <li>
                <span className="font-medium">Availability:</span>{" "}
                <span
                  className={`inline-block px-2 py-0.5 rounded text-white text-xs ${
                    bike.availability === "available"
                      ? "bg-green-500"
                      : bike.availability === "rented"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}>
                  {bike.availability}
                </span>
              </li>
              <li>
                <span className="font-medium">Rate per minute:</span> $
                {bike.minuteRate}
              </li>
              <li>
                <span className="font-medium">Created:</span>{" "}
                {new Date(bike.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </div>

          {bike.image && (
            <div className="flex items-center justify-center">
              <img
                src={bike.image || "/placeholder-bike.png"} // fallback image
                alt="Your Bike"
                className="rounded-xl object-cover max-h-64 w-full"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 text-sm text-center">
          You don’t own any bike yet.
        </div>
      )}
    </>
  );
}

export default MyBike;
