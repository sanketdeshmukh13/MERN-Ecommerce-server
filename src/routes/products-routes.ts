import express from "express";
import { adminOnly } from "../middlewares/auth-middleware.js";
import {
  getlatestProducts,
  newProduct,
  getAllCategories,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/product-controller.js";
import { singleUpload } from "../middlewares/multor.js";

const app = express.Router();

//To Create New Product  - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

// To get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
