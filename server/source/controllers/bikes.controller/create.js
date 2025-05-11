import Bikes from "../../models/bikes.model.js";
import User from "../../models/user.model.js";

export const createBike = async (req, res) => {
  try {
    const {location,minuteRate} = req.body;
    const owner = req.user.userId;
    console.log(owner);
    // Validate required fields
    if (!owner || !location  || !minuteRate) {
      return res.status(400).json({
        success: false,
        message: "Owner, location, and useTime are required fields",
        errorType: "MISSING_FIELDS",
      });
    }

    // Validate owner exists
    const ownerExists = await User.exists({ _id: owner });
    if (!ownerExists) {
      return res.status(404).json({
        success: false,
        message: "Owner user not found",
        errorType: "OWNER_NOT_FOUND",
      });
    }
    // Validate minuteRate is a positive number
    if (minuteRate <= 0) {
      return res.status(400).json({
        success: false,
        message: "Minute rate must be a positive number",
        errorType: "INVALID_MINUTE_RATE"
      })
    }

    // Create new bike
    const newBike = new Bikes({
      owner,
      location,
      minuteRate,
    });

    // Save to database
    await newBike.save();

    // Populate owner details in response (lean for better performance)
    const createdBike = await Bikes.findById(newBike._id)
      .populate("owner", "email _id") // Only include necessary fields
      .populate("user", "email _id") // Only include necessary fields
      .lean();

    return res.status(201).json({
      success: true,
      message: "Bike created successfully",
      data: {
        ...createdBike,
        // Remove any sensitive data that might have been included
        owner: { _id: createdBike.owner._id, email: createdBike.owner.email },
        user: createdBike.user
          ? {
              _id: createdBike.user._id,
              email: createdBike.user.email,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error creating bike:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
        errorType: "VALIDATION_ERROR",
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Bike already exists with these details",
        errorType: "DUPLICATE_BIKE",
      });
    }

    // Handle CastError (invalid ObjectId)
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
        errorType: "INVALID_ID_FORMAT",
      });
    }

    // Generic error handler
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorType: "SERVER_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
