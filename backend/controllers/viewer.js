import pool from "../config/dbconfig.js";

export async function sayhello(req, res) {
  try {
    const { id } = req.params;
    console.log("The id of the blog is : ", id);
    return res
      .status(200)
      .json({
        message: "The blog has been fetched successfully on basis of id!",
      });
  } catch (error) {
    console.log("Error detected! : ", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
