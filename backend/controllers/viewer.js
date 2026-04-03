import pool from "../config/dbconfig.js";

export async function getBlogbyId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
        SELECT 
            CONCAT(a.firstName, ' ', a.lastName) AS author,
            b.blogId        AS blogId,
            b.title         AS title,
            b.summary       AS summary,
            b.body          AS body,
            b.createdAt     AS createdAt,
            b.headImageUrl  AS headImageUrl

        FROM blogs b
        INNER JOIN users a
            ON a.userId = b.authorId

        WHERE 
            b.status = 'published'
            AND b.blogId = ?;
        `,
      [id],
    );
    // console.log(rows);

    return res.status(200).json({
      message: "The blog has been fetched successfully on basis of id!",
      blogData: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getCommentsById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
        SELECT 
        a.commentId AS commentId,
        CONCAT(b.firstName, ' ', b.lastName) AS commentAuthor,
        a.commentBody AS comment,
        a.commentedAt AS commentDate

        FROM comments a
        JOIN users b
        ON a.userId = b.userId

        WHERE 
        a.blogId = ?;
        `,
      [id],
    );
    console.log(rows);

    return res.status(200).json({
      message: "The blog has been fetched successfully on basis of id!",
      rows: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
