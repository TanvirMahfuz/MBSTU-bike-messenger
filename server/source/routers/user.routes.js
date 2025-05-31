import { Router } from "express";
import {
  createUser,
  readAllUsers,
  readOneUser,
  loginUser,
  checkUser,
  userProfile
} from "../controllers/user.controller/userController.js";
const userRouter = Router();

userRouter.get("/allUsers", readAllUsers);
userRouter.get("/check", checkUser);
userRouter.get("/profile", userProfile);
userRouter.get("/oneUser/:id", readOneUser);
userRouter.post("/registerUser", createUser);
userRouter.post("/log-in", loginUser);

export default userRouter;
