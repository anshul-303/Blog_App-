import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import {
  getBlogbyId,
  getCommentsById,
  addComment,
  getReactionsById,
  alterUserReaction,
  getPublishedBlogs,
} from "../controllers/viewer.js";
const viewerRouter = express.Router();

viewerRouter.get("/published", verifyJwt, getPublishedBlogs);
viewerRouter.get("/:id", verifyJwt, getBlogbyId);
viewerRouter.get("/comments/:id", verifyJwt, getCommentsById);
viewerRouter.get("/reactions/:id", verifyJwt, getReactionsById);
viewerRouter.post("/reactions/:id", verifyJwt, alterUserReaction);
viewerRouter.post("/comments/:id", verifyJwt, addComment);

export default viewerRouter;
