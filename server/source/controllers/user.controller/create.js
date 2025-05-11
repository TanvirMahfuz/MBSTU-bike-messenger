import User from "../../models/user.model.js";
import { hashPassword } from "../../utility/passwordManager.js";
import { generateToken } from "../../utility/tokenManger.js";

export const createUser = async (req, res) => {
  try {
    // Validate request body
    const { name,email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        errorType: "MISSING_FIELDS",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        errorType: "INVALID_EMAIL",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
        errorType: "WEAK_PASSWORD",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
        errorType: "USER_EXISTS",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await user.save();

    // Get user data without password
    const userData = await User.findOne({ email: user.email }).select(
      "-password"
    );

    if (!userData) {
      throw new Error("Failed to retrieve user after creation");
    }

    // Generate token
    const token = generateToken({ userId: user._id, email: user.email });

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Return success response
    return res.status(201).cookie("token", token, cookieOptions).json({
      message: "User created successfully",
      data: userData,
    });
  } catch (error) {
    console.error("Error in createUser:", error);

    // Handle specific Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation error",
        errors,
        errorType: "VALIDATION_ERROR",
      });
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(409).json({
        message: "User already exists",
        errorType: "USER_EXISTS",
      });
    }

    // Handle password hashing errors
    if (error.message.includes("password hashing")) {
      return res.status(500).json({
        message: "Error securing password",
        errorType: "PASSWORD_HASHING_ERROR",
      });
    }

    // Generic error handler
    return res.status(500).json({
      message: "Internal server error",
      errorType: "SERVER_ERROR",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
