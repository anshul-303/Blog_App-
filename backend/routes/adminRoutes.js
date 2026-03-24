import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import { getAllSubmissions } from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.get("/submissions", verifyJwt, getAllSubmissions);

export default adminRouter;
