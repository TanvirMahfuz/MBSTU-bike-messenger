import { Router } from "express";
import userRouter from "./user.routes.js";
import bikesRouter from "./bikes.routes.js";
import rentRouter from "./rent.routes.js";
const router = Router();

router.use("/user", userRouter);
router.use("/bikes", bikesRouter);
router.use("/rent", rentRouter);

export default router;
