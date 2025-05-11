import React from "react";
import AddBikeForm from "../components/bikes/AddBikeForm/AddBikeForm";

function AddBikePage() {
  const handleSuccess = (newBike) => {
    console.log("Bike added:", newBike);
    // Redirect or show success message
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AddBikeForm onSuccess={handleSuccess} />
    </div>
  );
}

export default AddBikePage;
