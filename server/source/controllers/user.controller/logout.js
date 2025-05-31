export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ success:true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({success:false, message: "Internal server error" });
  }
};
