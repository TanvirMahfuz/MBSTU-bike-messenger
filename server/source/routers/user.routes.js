import { Router } from "express";
import {
  createUser,
  readAllUsers,
  readOneUser,
  loginUser
} from "../controllers/user.controller/userController.js";
const userRouter = Router();

userRouter.get("/allUsers", readAllUsers);
userRouter.get("/oneUser/:id", readOneUser);
userRouter.post("/registerUser", createUser);
userRouter.post("/log-in", loginUser);

export default userRouter;
