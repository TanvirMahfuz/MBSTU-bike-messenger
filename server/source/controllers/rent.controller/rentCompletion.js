import User from "../../models/user.model.js";
import Bikes from "../../models/bikes.model.js";
import Rent from "../../models/rent.model.js";

export const rentCompletion = async (req, res) => {
  try {
    const { bikeId, endDate } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!bikeId || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Bike ID and end date are required",
        errorType: "MISSING_FIELDS",
      });
    }

    // Validate end date
    const endDateTime = new Date(endDate);
    if (isNaN(endDateTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
        errorType: "INVALID_DATE_FORMAT",
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

    // Check bike exists and is rented to this user
    const bike = await Bikes.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
        errorType: "BIKE_NOT_FOUND",
      });
    }

    if (bike.availability !== "rented" || bike.user?.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "Bike is not rented by you",
        errorType: "BIKE_NOT_RENTED_BY_USER",
      });
    }

    // Find active rental
    const rent = await Rent.findOne({
      bike: bikeId,
      user: userId,
      status: "ongoing",
    });

    if (!rent) {
      return res.status(404).json({
        success: false,
        message: "Active rental not found",
        errorType: "RENT_NOT_FOUND",
      });
    }

    // Calculate duration and total cost
    const startDate = new Date(rent.startDate);
    const durationMinutes = Math.ceil((endDateTime - startDate) / (1000 * 60));
    const totalCost = parseFloat(
      (durationMinutes * bike.minuteRate).toFixed(2)
    );

    // Update rental record
    rent.endDate = endDateTime;
    rent.totalPrice = totalCost;
    rent.status = "completed";
    await rent.save();

    // Update bike status
    bike.availability = "available";
    bike.user = undefined;
    await bike.save();

    return res.status(200).json({
      success: true,
      message: "Rental completed successfully",
      data: {
        rentalId: rent._id,
        bikeId: bike._id,
        durationMinutes,
        minuteRate: bike.minuteRate,
        totalPrice: totalCost,
        startDate: rent.startDate,
        endDate: rent.endDate,
        bikeStatus: "available",
      },
    });
  } catch (error) {
    console.error("Rental completion error:", error);

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
