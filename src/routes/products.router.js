import { Router, json } from 'express';
import ProductController from '../controllers/products.controller.js';
import { checkRole } from '../middlewares/auth.js';

const productsRouter = Router();
productsRouter.use(json());

// GET /
productsRouter.get("/", ProductController.getProducts);

// GET /mockingprodcuts // NO DOCUMENTADA
productsRouter.get("/mockingproducts", ProductController.getMockingProducts);

// GET /:pid
productsRouter.get("/:pid", ProductController.getProductById);

// POST /
productsRouter.post("/", checkRole(["admin"]), ProductController.addProduct); 

// PUT /:pid
productsRouter.put("/:pid", checkRole(["admin"]), ProductController.updateProduct);

// DELETE /:pid
productsRouter.delete("/:pid", checkRole(["admin"]), ProductController.deleteProduct);


export default productsRouter;
