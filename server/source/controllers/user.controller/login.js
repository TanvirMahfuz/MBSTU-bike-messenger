import User from "../../models/user.model.js";
import { comparePassword } from "../../utility/passwordManager.js";
import { generateToken } from "../../utility/tokenManger.js";
export const loginUser = async (req,res) => {
  const { email, password } = req.body;
  try {
    console.log("Login attempt with email:", email);
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken({ userId: user._id, email: user.email })
    const newUser = user.toObject();
    delete newUser.password;
    console.log("cookie token:", token);
    res.status(200).cookie("token",token).json({ message: "Login successful",user:newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
