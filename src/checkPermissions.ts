import { ExtendedRequest } from "./userInterface";

// Middleware to check user role
const permissionCheck = (req: ExtendedRequest, res, next) => {
  if (req.user.role === "admin" || req.user.role === "standard") {
    next();
  } else {
    res.status(403).json({
      error: "Unauthorized access",
    });
  }
};

export default permissionCheck;
