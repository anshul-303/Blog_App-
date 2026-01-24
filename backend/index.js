import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import pool from "./config/dbconfig.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
dotenv.config({ quiet: true });
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/", async (req, res) => {
  const [result]=await pool.query("SHOW tables;");
  res.status(200).json({ message: "ok" });
});

app.listen(process.env.PORT || 8000);
