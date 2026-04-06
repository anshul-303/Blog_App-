import express from "express";
import { verifyJwt } from "../middleware/verifyJwt.js";
import {
  getBlogbyId,
  getCommentsById,
  addComment,
  getReactionsById,
  alterUserReaction,
  getPublishedBlogs,
  roleChangeRequest,
  getRoleCR,
} from "../controllers/viewer.js";
const viewerRouter = express.Router();

viewerRouter.get("/published", verifyJwt, getPublishedBlogs);
viewerRouter.get("/comments/:id", verifyJwt, getCommentsById);
viewerRouter.get("/reactions/:id", verifyJwt, getReactionsById);
viewerRouter.get("/role-change", verifyJwt, getRoleCR);
viewerRouter.get("/:id", verifyJwt, getBlogbyId);

viewerRouter.post("/comments/:id", verifyJwt, addComment);
viewerRouter.post("/reactions/:id", verifyJwt, alterUserReaction);
viewerRouter.post("/role-change", verifyJwt, roleChangeRequest);

export default viewerRouter;
