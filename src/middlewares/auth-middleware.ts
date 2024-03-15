import { User } from "../models/user-model";
import ErrorHandler from "../utils/utility-class-utils";
import { TryCatch } from "./error-middleware";

// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Please Login First 💩", 401));

  const user = await User.findById(id);
  if (!user) return next(new ErrorHandler("Invalid Id or Password", 401));
  if (user.role !== "admin")
    return next(new ErrorHandler("You are Not Admin ☠️ ", 403));

  next();
});
