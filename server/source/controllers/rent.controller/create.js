import Bikes from "../../models/bikes.model.js";
import Rent from "../../models/rent.model.js";
import User from "../../models/user.model.js";

export const createRent = async (req, res) => {
  try {
    const { bikeId } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!bikeId) {
      return res.status(400).json({
        success: false,
        message: "Bike ID is required",
        errorType: "MISSING_BIKE_ID",
      });
    }

    // Check user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        errorType: "USER_NOT_FOUND",
      });
    }

    // Check bike exists and is available
    const bike = await Bikes.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
        errorType: "BIKE_NOT_FOUND",
      });
    }

    if (bike.availability !== "available") {
      return res.status(400).json({
        success: false,
        message: "Bike is not available for rent",
        errorType: "BIKE_NOT_AVAILABLE",
        currentStatus: bike.availability,
      });
    }

    // Check for existing active rentals
    const existingRental = await Rent.findOne({
      bike: bikeId,
      status: { $in: ["ongoing", "pending"] },
    });

    if (existingRental) {
      return res.status(409).json({
        success: false,
        message: "Bike is already rented by another user",
        errorType: "BIKE_ALREADY_RENTED",
      });
    }

    // Create rental and update bike without using a transaction
    const newRental = new Rent({
      bike: bikeId,
      user: userId,
      startDate: new Date(),
      status: "ongoing",
    });

    await newRental.save();

    bike.availability = "rented";
    bike.user = userId;
    await bike.save();

    return res.status(201).json({
      success: true,
      message: "Rental created successfully",
      data: {
        rentalId: newRental._id,
        bikeId: bike._id,
        userId: user._id,
        startDate: newRental.startDate,
        minuteRate: bike.minuteRate,
        bikeStatus: bike.availability,
      },
    });
  } catch (error) {
    console.error("Rental creation error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        errorType: "INVALID_ID_FORMAT",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorType: "SERVER_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
