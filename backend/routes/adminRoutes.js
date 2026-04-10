import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import {
  getAllSubmissions,
  updateBlogStatus,
  getAdminSummary,
  getAdminRoleChangeRequests,
  handleAdminRoleChangeRequests,
  getUsersList,
} from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.get("/submissions", verifyJwt, getAllSubmissions);
adminRouter.get("/requests", verifyJwt, getAdminRoleChangeRequests);
adminRouter.get("/users", verifyJwt, getUsersList);
adminRouter.post("/requests", verifyJwt, handleAdminRoleChangeRequests);
adminRouter.patch("/submissions", verifyJwt, updateBlogStatus);
adminRouter.get("/submissions/summary", verifyJwt, getAdminSummary);

export default adminRouter;
