// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // path correct ga untey
console.log("🔥🔥 AUTH MIDDLEWARE LOADED - NEW VERSION 🔥🔥");
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to req object
      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ pass control to next middleware/route
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } 

  return res.status(401).json({ message: "Not authorized, no token" });
};

export default protect;