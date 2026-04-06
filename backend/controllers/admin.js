import pool from "../config/dbconfig.js";

export async function getAllSubmissions(req, res) {
  try {
    // console.log("The submissions have been fetched!");
    const [rows] = await pool.query(`
        SELECT 
        CONCAT(u.firstName, ' ', u.lastName) AS authorName, 
        b.blogId, 
        b.title, 
        b.createdAt 
        FROM blogs b
        INNER JOIN users u ON b.authorId = u.userId 
        WHERE b.status = 'submitted' 
        ORDER BY b.createdAt DESC;
      `);
    return res.status(200).json({
      message: "All the submissions have been sent successfully!",
      submissions: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function updateBlogStatus(req, res) {
  try {
    const { blogId, status } = req.body;
    const [result] = await pool.query(
      `UPDATE blogs SET status=? WHERE blogId=?;`,
      [status, blogId],
    );
    // console.log("No. of rows affected : ", result.affectedRows);
    return res.status(200).json({
      message: "Status of the blog has been updated successfully!",
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getAdminSummary(req, res) {
  try {
    console.log("Fetching admin summary...");
    const [rows] = await pool.query(`
      SELECT 
        COUNT(blogId) AS submissions,
        COALESCE(SUM(CASE WHEN status = 'submitted' THEN 1 ELSE 0 END), 0) AS pending,
        COALESCE(SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END), 0) AS published,
        COALESCE(SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END), 0) AS rejected
      FROM blogs;
    `);
    // console.log(rows);
    return res.status(200).json({
      message: "Admin summary fetched successfully!",
      ...rows[0],
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getAdminRoleChangeRequests(req, res) {
  try {
    console.log("Fetching admin role change requests...");
    const [rows] = await pool.query(`
      SELECT 
      r.requestId as requestId, 
      r.requestedBy as requestedBy,
      r.createdAt as createdAt,
      CONCAT(u.firstName, ' ', u.lastName) AS name
      FROM 
          rolechangelogs r
      INNER JOIN 
          users u ON r.requestedBy = u.userId;
    `);
    console.log(rows);
    return res.status(200).json({
      message: "Admin role change requests fetched successfully!",
      rows: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function handleAdminRoleChangeRequests(req, res) {
  try {
    console.log("Handling admin role change requests...");
    const {action}=req.body;
    console.log(action)
    // const [rows] = await pool.query(`
    //   SELECT 
    //   r.requestId as requestId, 
    //   r.requestedBy as requestedBy,
    //   r.createdAt as createdAt,
    //   CONCAT(u.firstName, ' ', u.lastName) AS name
    //   FROM 
    //       rolechangelogs r
    //   INNER JOIN 
    //       users u ON r.requestedBy = u.userId;
    // `);
    // console.log(rows);
    return res.status(200).json({
      message: "Admin role change requests fetched successfully!",
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}


/* 1. Query to the database to change thw role of the user from viewer to user
2. Update the role change logs table with resolved request time and user ID of the admin which has resolved the request.
3. Return remaining requests to frontend by by refactoring the API call in adminApi.js
*/