import { Router } from "express";
import {
  createBike,
  readAllBikes,
  readOneBike,
} from "../controllers/bikes.controller/bikesController.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const bikesRouter = Router();

bikesRouter.get("/allBikes", readAllBikes);
bikesRouter.get("/oneBike/:id", readOneBike);
bikesRouter.post("/createBike",isLoggedIn, createBike);

export default bikesRouter;
