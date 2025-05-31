import Bikes from "../../models/bikes.model.js";
import User from "../../models/user.model.js";

export const createBike = async (req, res) => {
  try {
    const { location, minuteRate } = req.body;
    const ownerId = req.user?.userId;

    // Early validation
    if (!ownerId || !location || !minuteRate) {
      return res.status(400).json({
        success: false,
        message: "location, minuteRate are required and you must be logged in",
        errorType: "MISSING_FIELDS",
      });
    }

    const rate = parseFloat(minuteRate);
    if (isNaN(rate) || rate <= 0) {
      return res.status(400).json({
        success: false,
        message: "Minute rate must be a positive number",
        errorType: "INVALID_MINUTE_RATE",
      });
    }

    // Fetch full user document to access bikes array
    const ownerUser = await User.findById(ownerId).lean();
    if (!ownerUser) {
      return res.status(404).json({
        success: false,
        message: "Owner user not found",
        errorType: "OWNER_NOT_FOUND",
      });
    }

    // if (ownerUser.bikes?.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "You already have a bike",
    //     errorType: "ALREADY_HAVE_BIKE",
    //   });
    // }

    // Create and save bike
    const newBike = await Bikes.create({
      owner: ownerId,
      location,
      minuteRate: rate,
    });

    // Update user's bikes array
    await User.findByIdAndUpdate(ownerId, {
      $push: { bikes: newBike._id },
    });

    // Populate owner data in response
    const createdBike = await Bikes.findById(newBike._id)
      .populate("owner", "email _id")
      .lean();
    console.log("Created bike:", createdBike);
    return res.status(201).json({
      success: true,
      message: "Bike created successfully",
      data: createdBike,
    });
  } catch (error) {
    console.error("Error creating bike:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: Object.values(error.errors).map((e) => e.message),
        errorType: "VALIDATION_ERROR",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Bike already exists with these details",
        errorType: "DUPLICATE_BIKE",
      });
    }

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
