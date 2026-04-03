import express from "express";
import {verifyJwt} from "../middleware/verifyJwt.js"
import { sayhello } from "../controllers/viewer.js";
const viewerRouter = express.Router();

viewerRouter.get("/:id", verifyJwt, sayhello);

export default viewerRouter;
