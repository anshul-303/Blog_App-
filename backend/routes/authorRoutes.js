import express from "express";
import { AddBlogToDB, getDrafts, getSubmitted } from "../controllers/author.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authorRouter = express.Router();

authorRouter.post("/", verifyJwt, AddBlogToDB);
authorRouter.get("/drafts", verifyJwt, getDrafts);
authorRouter.get("/submitted", verifyJwt, getSubmitted);


export default authorRouter;
