import express from "express";
import { AddBlogToDB, getDrafts } from "../controllers/author.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authorRouter = express.Router();

authorRouter.post("/", verifyJwt, AddBlogToDB);
authorRouter.get("/drafts", verifyJwt, getDrafts);

export default authorRouter;
