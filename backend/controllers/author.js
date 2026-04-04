import pool from "../config/dbconfig.js";

export async function AddBlogToDB(req, res) {
  try {
    const { blogBody, summary, title, headImageURL, action } = req.body;
    const userId = req.userId;
    const status = action.toLowerCase() === "submit" ? "submitted" : "draft";
    const role = req.role;

    if (role != "author") {
      return res.status(403).json({
        message: "Only author is authorized to create or draft blogs.",
      });
    }
    if (action.toLowerCase() != "submit" && action.toLowerCase() != "draft") {
      return res.status(400).json({ message: "Invalid action!" });
    }
    if (!title || !summary || !blogBody || !headImageURL || !action) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    await pool.query(
      `INSERT INTO blogs 
        (authorId, title, summary, body, headImageUrl, status)  
        VALUES (?, ?, ?, ?, ?, ?);
            `,
      [userId, title, summary, blogBody, headImageURL, status],
    );

    return res
      .status(201)
      .json({ message: `Blog added created successfully!` });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getDrafts(req, res) {
  try {
    // console.log("Fetching drafts...");
    const [rows] = await pool.query(
      `
        SELECT blogId, title, summary FROM blogs WHERE authorId = ? AND status = 'draft';
      `,
      [req.userId],
    );
    if (rows.length === 0) {
      return res.status(201).json({
        message: `There are currently no drafts available!`,
        drafts: [],
      });
    }
    return res.status(201).json({
      message: `The drafts have been fetched successfully!`,
      drafts: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getSubmitted(req, res) {
  try {
    console.log("Fetching submitted articles...");
    const [rows] = await pool.query(
      `
        SELECT blogId, title, summary, createdAt FROM blogs WHERE authorId = ? AND status = 'submitted';
      `,
      [req.userId],
    );
    if (rows.length === 0) {
      return res.status(201).json({
        message: `There are currently no submitted blogs!`,
        submitted: [],
      });
    }
    // console.log(rows)
    return res.status(201).json({
      message: `The drafts have been fetched successfully!`,
      submitted: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
