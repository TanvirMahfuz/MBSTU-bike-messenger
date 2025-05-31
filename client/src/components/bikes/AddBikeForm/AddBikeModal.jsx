import React, { useState } from "react";
import PropTypes from "prop-types";
import { useBikeStore } from "../../../store/useBikeStore";
import LocationInput from "./LocationInput";
import MinuteRateInput from "./MinuteRateInput";
import SubmitButton from "./SubmitButton";
import ErrorDisplay from "./ErrorDisplay";

const AddBikeModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    location: "",
    minuteRate: "",
  });
  const { addBike, isLoading, error } = useBikeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding bike:", formData);
      const res = await addBike(formData);
      if (res){
        console.log("Bike added successfully!");
        onClose();
        setFormData({ location: "", minuteRate: "" });
      }
      else {
        console.log("Error adding bike:", error);
      }
    } catch (err) {
      console.error("Error adding bike:", err);
      onClose()
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Blurred background - separate div with lower z-index */}
      <div
        className="fixed inset-0 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal container - higher z-index */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
          {/* Modal content */}
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Bike
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <LocationInput
                  value={formData.location}
                  onChange={handleChange}
                />
                <MinuteRateInput
                  value={formData.minuteRate}
                  onChange={handleChange}
                />
              </div>

              {error && <ErrorDisplay message={error} />}

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Cancel
                </button>
                <SubmitButton loading={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

AddBikeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddBikeModal;
