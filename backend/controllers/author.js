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

export async function getAuthorStatistics(req, res) {
  try {
    // console.log("Fetching author statistics...");
    const [likesRows] = await pool.query(
      `
        SELECT 
        COUNT(r.userId) AS totalLikes
        FROM reactions AS r
        JOIN blogs AS b 
          ON r.blogId = b.blogId
        WHERE b.authorId = ? 
          AND r.reaction = 'like';
  `,
      [req.userId],
    );
    const [publishedBlogsRows] = await pool.query(
      `
        SELECT 
        COUNT(blogId) AS publishedBlogs 
        FROM blogs 
        WHERE authorId = ?
        AND status = 'published';
  `,
      [req.userId],
    );
    const [commentsRows] = await pool.query(
      `
        SELECT 
            COUNT(c.commentId) AS totalComments 
        FROM comments AS c 
        INNER JOIN blogs AS b 
            ON c.blogId = b.blogId
        WHERE b.authorId = ?;
  `,
      [req.userId],
    );
    return res.status(201).json({
      message: `The author statistics have been fetched successfully!`,
      totalLikes: likesRows[0].totalLikes,
      publishedBlogs: publishedBlogsRows[0].publishedBlogs,
      totalComments: commentsRows[0].totalComments,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getAllAuthorArticles(req, res) {
  try {
    console.log("Fetching author articles...");
    const [rows] = await pool.query(
      `
  
      SELECT 
        CONCAT(u.firstName, ' ', u.lastName) AS authorName,
        b.blogId, 
        b.title,
        b.summary, 
        b.createdAt,
        COUNT(DISTINCT r.userId) AS likeCount,
        COUNT(DISTINCT c.commentId) AS commentCount,
        b.status as status
        FROM blogs AS b 
        INNER JOIN users AS u 
            ON u.userId = b.authorId 
        LEFT JOIN reactions AS r 
            ON r.blogId = b.blogId 
            AND r.reaction = 'like'
        LEFT JOIN comments AS c 
            ON c.blogId = b.blogId
        WHERE b.authorId = ?
        GROUP BY b.blogId
        ORDER BY b.createdAt DESC;
    `,
      [req.userId],
    );
    console.log(rows);
    return res.status(201).json({
      message: `All the author articles have been fetched successfully!`,
      blogsList: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getDraftById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
      
      SELECT 
      blogId,
      title, 
      summary, 
      body, 
      headImageUrl 
      FROM 
          blogs 
      WHERE 
          status = 'draft' AND blogId=?;`,
      [id],
    );
    // console.log(rows);
    return res
      .status(200)
      .json({ message: "The draft has been fetched by ID!", draft: rows });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function updateDraftById(req, res) {
  try {
    const { id } = req.params;
    const { body, title, summary, headImageUrl, action } = req.body;
    // console.log(id, body, title, summary, headImageUrl, action);
    const status = action === "submit" ? "submitted" : "draft";
    await pool.query(
      `
    UPDATE blogs
    SET 
      title = ?, 
      summary = ?, 
      body = ?, 
      headImageUrl = ?, 
      updatedAt = NOW(), 
      status = ? 
    WHERE 
      blogId = ?;
    `,
      [title, summary, body, headImageUrl, status, id],
    );
    return res.status(200).json({
      message: `The post has been successfully saved as ${status}!`,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
