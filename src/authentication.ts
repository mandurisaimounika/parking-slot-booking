import { ExtendedRequest } from "./userInterface";
import * as jwt from "jsonwebtoken";
import { executeQuery } from "./database/dataQuery";

// Middleware to authenticate users with an API token
const authenticateToken = async (req: ExtendedRequest, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const decoded = jwt.decode(token);
  const text = "SELECT * FROM users WHERE firstname = $1 AND lastname = $2";
  const values = [decoded?.firstName, decoded?.lastName];
  const user = await executeQuery(text, values);

  if (!user[0]) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  req.user = user[0];
  next();
};

export default authenticateToken;
