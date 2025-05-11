export const rentCompletion = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bikeId, endDate } = req.body;
    const userId = req.user.userId;

    // Validate input
    if (!bikeId || !endDate) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Bike ID and end date are required",
        errorType: "MISSING_FIELDS",
      });
    }

    // Validate end date
    const endDateTime = new Date(endDate);
    if (isNaN(endDateTime.getTime())) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
        errorType: "INVALID_DATE_FORMAT",
      });
    }

    // Check user exists
    const user = await User.findById(userId).session(session);
    if (!user) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "User not found",
        errorType: "USER_NOT_FOUND",
      });
    }

    // Check bike exists and is rented to this user
    const bike = await Bikes.findById(bikeId).session(session);
    if (!bike) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Bike not found",
        errorType: "BIKE_NOT_FOUND",
      });
    }

    if (bike.availability !== "rented" || bike.user?.toString() !== userId) {
      await session.abortTransaction();
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
    }).session(session);

    if (!rent) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Active rental not found",
        errorType: "RENT_NOT_FOUND",
      });
    }

    // Calculate duration in minutes and cost
    const startDate = new Date(rent.startDate);
    const durationMinutes = Math.ceil((endDateTime - startDate) / (1000 * 60));
    const totalCost = parseFloat((durationMinutes * bike.minuteRate).toFixed(2));

    // Update rental record
    rent.endDate = endDateTime;
    rent.totalPrice = totalCost; // Note: Field renamed to totalPrice in your schema
    rent.status = "completed";
    await rent.save({ session });

    // Update bike status and clear user
    bike.availability = "available";
    bike.user = undefined;
    await bike.save({ session });

    await session.commitTransaction();

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
    await session.abortTransaction();
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
      details: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  } finally {
    session.endSession();
  }
};