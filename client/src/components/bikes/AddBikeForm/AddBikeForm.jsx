import React, { useState } from "react";
import { useBikeStore } from "../../../store/useBikeStore";
import LocationInput from "./LocationInput";
import MinuteRateInput from "./MinuteRateInput";
import SubmitButton from "./SubmitButton";
import ErrorDisplay from "./ErrorDisplay";

export default function AddBikeForm() {
  const [formData, setFormData] = useState({
    location: "",
    minuteRate: "",
  });

  const { addBike, isLoading, error } = useBikeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding bike:", formData);
      await addBike(formData);
      setFormData({ location: "", minuteRate: "" }); 
    } catch (err) {
      console.error("Error adding bike:", err);
      
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Bike</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <LocationInput value={formData.location} onChange={handleChange} />
        <MinuteRateInput value={formData.minuteRate} onChange={handleChange} />
        <SubmitButton loading={isLoading} />
        {error && <ErrorDisplay message={error} />}
      </form>
    </div>
  );
}
