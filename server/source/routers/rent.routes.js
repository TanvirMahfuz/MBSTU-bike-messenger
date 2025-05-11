import { Router } from "express";
import {
  createRent,
  rentCompletion,
} from "../controllers/rent.controller/rentController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const rentRouter = Router();
rentRouter.post("/create", isLoggedIn, createRent);
rentRouter.post("/complete", isLoggedIn, rentCompletion);
export default rentRouter;
