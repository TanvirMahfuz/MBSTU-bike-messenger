import User from "../../models/user.model.js";
import { verifyToken } from "../../utility/tokenManger.js";
export const userProfile = async (req,res)=>{
  try {
    const token = req.cookies.token;
    console.log("Checking user with token:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verifyToken(token);
    const userId = decoded.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = user.toObject();
    delete userData.password;
    return res.status(200).json({success:true, message: "User found", user: userData });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      errorType: "INTERNAL_SERVER_ERROR",
    });
  }
}