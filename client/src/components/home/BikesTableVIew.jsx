import { useState } from "react";
import { useBikeStore } from "../../store/useBikeStore";
const BikesTableView = () => {
  // const {bikes} = useBikeStore()
  // State for bikes data
  const [bikes, setBikes] = useState([
    {
      id: 1,
      owner: "John Doe",
      availability: "Available",
      user: "-",
      location: "Central Park, New York",
    },
    {
      id: 2,
      owner: "Jane Smith",
      availability: "Rented",
      user: "Mike Johnson",
      location: "Downtown, Chicago",
    },
    {
      id: 3,
      owner: "Bike Rentals Inc.",
      availability: "Available",
      user: "-",
      location: "Santa Monica Pier, LA",
    },
    {
      id: 4,
      owner: "City Bikes",
      availability: "Maintenance",
      user: "-",
      location: "Main Station, Boston",
    },
    {
      id: 5,
      owner: "David Brown",
      availability: "Available",
      user: "-",
      location: "Golden Gate Park, SF",
    },
  ]);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  // State for current user (simulating logged in user)
  const [currentUser] = useState("Alex Rider");

  // Function to rent a bike
  const rentBike = (bikeId) => {
    setBikes(
      bikes.map((bike) => {
        if (bike.id === bikeId && bike.availability === "Available") {
          return {
            ...bike,
            availability: "Rented",
            user: currentUser,
          };
        }
        return bike;
      })
    );
  };

  // Function to return a bike
  const returnBike = (bikeId) => {
    setBikes(
      bikes.map((bike) => {
        if (
          bike.id === bikeId &&
          bike.availability === "Rented" &&
          bike.user === currentUser
        ) {
          return {
            ...bike,
            availability: "Available",
            user: "-",
          };
        }
        return bike;
      })
    );
  };

  // Sort function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedBikes = [...bikes].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setBikes(sortedBikes);
  };

  // Function to get availability color
  const getAvailabilityColor = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Rented":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Bikes Management
      </h1>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 bg-gray-50 p-3 rounded-t-lg border-b border-gray-200 font-semibold text-gray-600">
        <p
          className="col-span-1 cursor-pointer hover:text-gray-900 flex items-center"
          onClick={() => requestSort("id")}>
          ID{" "}
          {sortConfig.key === "id" &&
            (sortConfig.direction === "ascending" ? "↑" : "↓")}
        </p>
        <p
          className="col-span-2 cursor-pointer hover:text-gray-900 flex items-center"
          onClick={() => requestSort("owner")}>
          Owner{" "}
          {sortConfig.key === "owner" &&
            (sortConfig.direction === "ascending" ? "↑" : "↓")}
        </p>
        <p
          className="col-span-1 cursor-pointer hover:text-gray-900 flex items-center"
          onClick={() => requestSort("availability")}>
          Status{" "}
          {sortConfig.key === "availability" &&
            (sortConfig.direction === "ascending" ? "↑" : "↓")}
        </p>
        <p
          className="col-span-2 cursor-pointer hover:text-gray-900 flex items-center"
          onClick={() => requestSort("user")}>
          Rented By{" "}
          {sortConfig.key === "user" &&
            (sortConfig.direction === "ascending" ? "↑" : "↓")}
        </p>
        <p
          className="col-span-4 cursor-pointer hover:text-gray-900 flex items-center"
          onClick={() => requestSort("location")}>
          Location{" "}
          {sortConfig.key === "location" &&
            (sortConfig.direction === "ascending" ? "↑" : "↓")}
        </p>
        <p className="col-span-2 text-right">Action</p>
      </div>

      {/* Table Rows */}
      {bikes.map((bike) => (
        <div
          key={bike.id}
          className="grid grid-cols-12 gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center">
          <p className="col-span-1 text-gray-600">{bike.id}</p>
          <p className="col-span-2 font-medium text-gray-800">{bike.owner}</p>
          <span
            className={`col-span-1 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
              bike.availability
            )}`}>
            {bike.availability}
          </span>
          <p className="col-span-2 text-gray-600">{bike.user}</p>
          <p className="col-span-4 text-gray-600">{bike.location}</p>
          <div className="col-span-2 flex justify-end">
            {bike.availability === "Available" ? (
              <button
                onClick={() => rentBike(bike.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Rent
              </button>
            ) : bike.availability === "Rented" && bike.user === currentUser ? (
              <button
                onClick={() => returnBike(bike.id)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors">
                Return
              </button>
            ) : (
              <span className="text-gray-400 text-sm">Not available</span>
            )}
          </div>
        </div>
      ))}

      {/* Empty state */}
      {bikes.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No bikes found. Add a new bike to get started.
        </div>
      )}
    </div>
  );
};

export default BikesTableView;
