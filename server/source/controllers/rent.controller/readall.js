import Rent from "../../models/rent.model.js"

export const readAllRents = async (req, res) => {
  try {
    const rents = await Rent.find();
    res.status(200).json({
      status: "success",
      data: rents,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
