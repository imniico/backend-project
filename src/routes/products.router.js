import { Router, json } from 'express';
import ProductController from '../controllers/products.controller.js';

const productsRouter = Router();
productsRouter.use(json());

// GET /
productsRouter.get("/", ProductController.getProducts);

// GET /:pid
productsRouter.get("/:pid", ProductController.getProductById);

// POST /
productsRouter.post("/", ProductController.addProduct);

// PUT /:pid
productsRouter.put("/:pid", ProductController.updateProduct);

// DELETE /:pid
productsRouter.delete("/:pid", ProductController.deleteProduct);

export default productsRouter;