import express from "express"
import { AddBlogToDB } from "../controllers/author.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authorRouter=express.Router();

authorRouter.post("/", verifyJwt, AddBlogToDB);

export default authorRouter;