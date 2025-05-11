import Bikes from "../../models/bikes.model.js";
export const readAllBikes = async (req, res) => {
  try {
    const bikes = await Bikes.find();
    return res.status(200).json({
      success: true,
      message: "Bikes found",
      data: bikes,
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
