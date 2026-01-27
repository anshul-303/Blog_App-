import jwt from "jsonwebtoken";

export const verifyJwt = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).json({ message: "Access token doesn't exist!" });
    return;
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log("Error detected:", error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
