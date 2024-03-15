import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  newUser,
} from "../controllers/user-controller";
import { adminOnly } from "../middlewares/auth-middleware.js";

const app = express.Router();

// route - /api/v1/user/new
app.post("/new", newUser);

// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUser).delete(adminOnly, deleteUser); //  ---Chaining

export default app;
