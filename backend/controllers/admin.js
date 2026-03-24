import pool from "../config/dbconfig.js";

export async function getAllSubmissions(req, res) {
  try {
    console.log("The submissions have been fetched!");
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
    console.log(rows);
    return res
      .status(200)
      .json({
        message: "All the submissions have been sent successfully!",
        submissions: rows,
      });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
