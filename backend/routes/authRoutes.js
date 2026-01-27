import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getNewAccessToken,
  checkAuth,
} from "../controllers/auth.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authRouter = express.Router();

authRouter.post("/signup", signupUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);
authRouter.get("/refresh", getNewAccessToken);
authRouter.get("/check-auth", verifyJwt, checkAuth);

export default authRouter;
