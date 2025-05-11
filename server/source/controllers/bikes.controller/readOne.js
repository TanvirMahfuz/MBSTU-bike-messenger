import Bikes from "../../models/bikes.model.js";
export const readOneBike = async (req, res) => {
  try {
    const { id } = req.params;
    const bike = await Bikes.findById(id);
    if (!bike) {
      return res.status(404).json({
        success: false,
        message: "Bike not found",
        errorType: "BIKE_NOT_FOUND",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bike found",
      data: bike,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorType: "INTERNAL_SERVER_ERROR",
    });
  }
};
