import mongoose from "mongoose";

const rentSchema = new mongoose.Schema({
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bikes",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "cancelled", "ongoing"],
    default: "ongoing",
  },

});
const Rent = mongoose.model("Rent", rentSchema);
export default Rent;
