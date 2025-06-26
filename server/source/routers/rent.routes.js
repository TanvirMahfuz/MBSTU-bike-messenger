import { Router } from "express";
import {
  createRent,
  rentCompletion,
  readAllRents,
  getRentedBikeOfUser,
} from "../controllers/rent.controller/rentController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const rentRouter = Router();
rentRouter.get("/allRent", isLoggedIn, readAllRents);
rentRouter.get("/user/:userId", isLoggedIn, getRentedBikeOfUser);
rentRouter.post("/create", isLoggedIn, createRent);
rentRouter.post("/complete", isLoggedIn, rentCompletion);
export default rentRouter;
