import Bikes from "../../models/bikes.model.js";


export const deleteBike = async (req, res) => {
  console.log("attempting to delete bike");
  try {

    const { bikeId } = req.params;
    const userId = req.user.userId;
    if (!bikeId) {
      return res.status(400).json({
        success: false,
        message: "Bike ID not provided",
        errorType: "MISSING_BIKE_ID",
      });
    }
    const bike = await Bikes.findById(bikeId);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
        errorType: "BIKE_NOT_FOUND",
      });
    }
    if (bike.owner.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this bike",
        errorType: "UNAUTHORIZED",
      });
    }
    const deletedBike = await Bikes.findByIdAndDelete(bikeId, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "Bike deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorType: "SERVER_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}