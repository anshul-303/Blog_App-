import express from "express";
import {
  AddBlogToDB,
  getAuthorStatistics,
  getDrafts,
  getSubmitted,
  getAllAuthorArticles,
  getDraftById,
  updateDraftById,
} from "../controllers/author.js";
import { verifyJwt } from "../middleware/verifyJwt.js";

const authorRouter = express.Router();

authorRouter.post("/", verifyJwt, AddBlogToDB);
authorRouter.get("/drafts", verifyJwt, getDrafts);
authorRouter.get("/draft/:id", verifyJwt, getDraftById);
authorRouter.post("/draft/:id", verifyJwt, updateDraftById);
authorRouter.get("/all", verifyJwt, getAllAuthorArticles);
authorRouter.get("/submitted", verifyJwt, getSubmitted);
authorRouter.get("/statistics", verifyJwt, getAuthorStatistics);

export default authorRouter;
