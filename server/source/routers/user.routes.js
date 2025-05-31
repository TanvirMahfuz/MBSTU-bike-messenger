import { Router } from "express";
import {
  createUser,
  readAllUsers,
  readOneUser,
  loginUser,
  checkUser,
  userProfile,
  logoutUser,
} from "../controllers/user.controller/userController.js";
const userRouter = Router();

userRouter.get("/allUsers", readAllUsers);
userRouter.get("/check", checkUser);
userRouter.get("/profile", userProfile);
userRouter.get("/oneUser/:id", readOneUser);
userRouter.post("/registerUser", createUser);
userRouter.post("/log-in", loginUser);
userRouter.get("/log-out", logoutUser);

export default userRouter;
