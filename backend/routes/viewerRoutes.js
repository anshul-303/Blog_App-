import express from "express";
import {verifyJwt} from "../middleware/verifyJwt.js"
import { getBlogbyId, getCommentsById } from "../controllers/viewer.js";
const viewerRouter = express.Router();

viewerRouter.get("/:id", verifyJwt, getBlogbyId);
viewerRouter.get("/comments/:id", verifyJwt, getCommentsById);


export default viewerRouter;
