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
    // console.log(rows);

    return res.status(200).json({
      message: "The blog comments has been fetched successfully on basis of id!",
      rows: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getReactionsById(req, res) {
  try {
    const { id } = req.params;
    const [likesRow] = await pool.query(
      `
        SELECT COUNT(userId) as likes
        FROM reactions 
        WHERE blogId = ? AND reaction = 'like';
    `,
      [id],
    );
    // console.log(likesRow);

    const [dislikesRow] = await pool.query(
      `
        SELECT COUNT(userId) as dislikes
        FROM reactions 
        WHERE blogId = ? AND reaction = 'dislike';
    `,
      [id],
    );
    // console.log(dislikesRow);

    const [userReactionRow] = await pool.query(
      `
        SELECT reaction as userReaction
        FROM reactions 
        WHERE blogId = ? AND userId = ?;
    `,
      [id, req.userId],
    );
    // console.log(userReactionRow);

    return res.status(200).json({
      message:
        "The blog reactions have been fetched successfully on basis of id!",
      likes: likesRow[0].likes,
      dislikes: dislikesRow[0].dislikes,
      userReaction:
        userReactionRow.length === 0 ? "none" : userReactionRow[0].userReaction,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function addComment(req, res) {
  try {
    const { id } = req.params;
    const { commentBody } = req.body;
    await pool.query(
      `INSERT INTO comments (userId, blogId, commentBody)
        VALUES
        (?, ?, ?);`,
      [req.userId, id, commentBody],
    );
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
    // console.log(rows);

    return res.status(200).json({
      message: "The comment has been added for the respective blog.",
      rows: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function alterUserReaction(req, res) {
  try {
    const { id } = req.params;
    const { userReaction } = req.body;

    //Check whether the reaction exists first
    const [checkrows] = await pool.query(
      "SELECT * from reactions where blogId=? and userId=?",
      [id, req.userId],
    );
    if (checkrows.length === 1) {
      await pool.query(
        "UPDATE reactions set reaction=? where blogId=? and userId=?;",
        [userReaction, id, req.userId],
      );
    } else if (checkrows.length === 0) {
      await pool.query(
        "INSERT INTO reactions (userId, blogId, reaction, createdAt) values (?, ?, ?, NOW());",
        [req.userId, id, userReaction],
      );
    }
    return res.status(200).json({
      message: "The user reaction has been update for the respective blog.",
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getPublishedBlogs(req, res) {
  try {
    console.log("Hello world!");
    const [rows] = await pool.query(`
        SELECT 
        CONCAT(a.firstName, ' ', a.lastName) AS Author,
        b.blogId AS blogId, 
        b.title AS title,
        b.summary AS summary, 
        b.createdAt AS createdAt,
        COUNT(DISTINCT r.userId) AS likeCount,
        COUNT(DISTINCT c.commentId) AS commentCount
        FROM blogs b 
        INNER JOIN users a 
            ON a.userId = b.authorId 
        LEFT JOIN reactions r 
            ON r.blogId = b.blogId AND r.reaction = 'like'
        LEFT JOIN comments c 
            ON c.blogId = b.blogId
        WHERE b.status = 'published' 
        GROUP BY b.blogId
        ORDER BY b.createdAt DESC 
        ;
    `);
    // console.log(rows);
    res.status(200).json({
      message: "The published blogs have been fetched successfully!",
      blogsList: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function roleChangeRequest(req, res) {
  try {
    console.log("The user is requesting for role change...");
    await pool.query(
      `
    INSERT into roleChangelogs (requestedBy)
    VALUES
    (?);
  `,
      [req.userId],
    );
    // const [rows] = await pool.query("SELECT * FROM roleChangelogs;");
    // console.log(rows);
    res.status(200).json({
      message: "The user request to change role has been generated!",
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}

export async function getRoleCR(req, res) {
  try {
    console.log("Fetching user requests for role change...");
    const [rows] = await pool.query(
      "SELECT * FROM roleChangelogs WHERE requestedBy=?;",
      [req.userId],
    );

    console.log(rows);
    res.status(200).json({
      message: "The user request to change role has been generated!",
      requests: rows,
    });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
