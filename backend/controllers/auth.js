import pool from "../config/dbconfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signupUser(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !email || !password || !lastName) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const [row] = await pool.query("SELECT userId FROM users WHERE email=?;", [
      email,
    ]);
    if (row.length > 0) {
      return res
        .status(409)
        .json({ message: "The user already exists with current email." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO users (firstName, lastName, email, passwordHash, role) VALUES (?, ?, ?, ?, ?);`,
      [firstName, lastName, email, hashedPassword, "viewer"],
    );
    return res
      .status(201)
      .json({ message: `Account created successfully for ${firstName}! ` });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const [row] = await pool.query("SELECT * FROM users WHERE email=?;", [
      email,
    ]);
    if (row.length === 0) {
      return res
        .status(404)
        .json({ message: "User doesn't exist with current email!" });
    }
    const foundUser = row[0];
    const match = await bcrypt.compare(password, foundUser.passwordHash);
    if (match) {
      return res.status(200).json({
        message: `Welcome back ${foundUser.firstName}!`,
        role: foundUser.role,
      });
    } else {
      return res
        .status(401)
        .json({ message: `Wrong password! Please try again!` });
    }
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
