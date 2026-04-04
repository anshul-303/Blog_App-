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
      const accessToken = jwt.sign(
        {
          userId: foundUser.userId,
          role: foundUser.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7s" },
      );

      const refreshToken = jwt.sign(
        {
          userId: foundUser.userId,
          role: foundUser.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" },
      );

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.COOKIE_SECURE === "true",
          sameSite: process.env.COOKIE_SAME_SITE,
          maxAge: 7 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.COOKIE_SECURE === "true",
          sameSite: process.env.COOKIE_SAME_SITE,
          maxAge: 24 * 3600 * 1000,
        })
        .status(200)
        .json({
          message: `Welcome back ${foundUser.firstName}!`,
          role: foundUser.role,
        });
    } 
    else {
      return res
        .status(401)
        .json({ message: `Wrong password! Please try again!` });
    }
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function logoutUser(req, res) {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SAME_SITE,
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SAME_SITE,
      })
      .status(200)
      .json({ message: "Logged the user out!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
}

export const getNewAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "No refresh token, please login again" });
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  const userId = decoded.userId;
  const [foundUser] = await pool.query("SELECT * FROM users WHERE userId=?;", [
    userId,
  ]);

  if (foundUser.length === 0) {
    res.status(404).json({ messasge: "Unauthorized!" });
  } else if (foundUser.length === 1) {
    const newAccessToken = jwt.sign(
      {
        userId: foundUser[0].userId,
        role: foundUser[0].role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7s" },
    );

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SAME_SITE,
        maxAge: 7 * 1000,
      })
      .status(200)
      .json({ message: "New Acess Token is assigned!" });
  }
};

export async function checkAuth(req, res) {
  const role = req.role;
  res.status(200).json({ message: "The user is authenticated!", role: role });
}
