import mongoose from "mongoose";

const bikesSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availability: {
      type: String,
      enum: ["available", "rented", "inMaintenance"],
      required: true,
      default: "available",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    location: {
      type: String,
      required: true,
    },
    minuteRate: {
      type: Number,
      default: 1.5,
      min: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Bikes = mongoose.model("Bikes", bikesSchema);
export default Bikes;
