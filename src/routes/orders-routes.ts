import express from "express";
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrders,
  newOrder,
  processOrder,
} from "../controllers/order-controller";

import { adminOnly } from "../middlewares/auth-middleware.js";

const app = express.Router();

// route - /api/v1/order/new
app.post("/new", adminOnly, newOrder);

// route - /api/v1/order/my
app.get("/my", adminOnly, myOrders);

// route - /api/v1/order/all
app.get("/all", adminOnly, allOrders);

app
  .route("/:id")
  .get(getSingleOrder)
  .put(adminOnly, processOrder)
  .delete(adminOnly, deleteOrder);

export default app;
