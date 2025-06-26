import Rent from "../../models/rent.model.js";
import User from "../../models/user.model.js";
export const getRentedBikeOfUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    
    const rents = await Rent.find({ user: userId, status: "ongoing" }).populate(
      "bike"
    );
    if (rents.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No rented bikes found for this user",
      });
    }
    return res.status(200).json({
      status: "success",
      data: rents,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
