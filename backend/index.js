import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import authorRouter from "./routes/authorRoutes.js";
import { verifyJwt } from "./middleware/verifyJwt.js";
import adminRouter from "./routes/adminRoutes.js";
import viewerRouter from "./routes/viewerRoutes.js";

dotenv.config({ quiet: true });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/author", authorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/viewer", viewerRouter);




app.get("/api/test", verifyJwt, (req, res) => {
  res.json({ message: "The access token is received successfully!" });
});

app.listen(process.env.PORT || 8000);
