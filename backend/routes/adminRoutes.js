import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { getAllSubmissions, updateBlogStatus } from "../controllers/admin.js";

const adminRouter = express.Router();


adminRouter.get("/submissions", verifyJwt, getAllSubmissions);
adminRouter.patch("/submissions", verifyJwt, updateBlogStatus);

export default adminRouter;
