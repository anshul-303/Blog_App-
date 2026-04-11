import express from "express";
import {
  AddBlogToDB,
  getAuthorStatistics,
  getDrafts,
  getSubmitted,
  getAllAuthorArticles,
  getDraftById,
} from "../controllers/author.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authorRouter = express.Router();

authorRouter.post("/", verifyJwt, AddBlogToDB);
authorRouter.get("/drafts", verifyJwt, getDrafts);
authorRouter.get("/draft/:id", verifyJwt, getDraftById);
authorRouter.get("/all", verifyJwt, getAllAuthorArticles);
authorRouter.get("/submitted", verifyJwt, getSubmitted);
authorRouter.get("/statistics", verifyJwt, getAuthorStatistics);

export default authorRouter;
