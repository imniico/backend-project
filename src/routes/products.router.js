import { Router, json } from 'express';
import ProductController from '../controllers/products.controller.js';
import { checkRole } from '../middlewares/auth.js';

const productsRouter = Router();
productsRouter.use(json());

// GET /
productsRouter.get("/", ProductController.getProducts);

// GET /:pid
productsRouter.get("/:pid", ProductController.getProductById);

// POST /
productsRouter.post("/", checkRole(["admin"]), ProductController.addProduct);

// PUT /:pid
productsRouter.put("/:pid", checkRole(["admin"]), ProductController.updateProduct);

// DELETE /:pid
productsRouter.delete("/:pid", checkRole(["admin"]), ProductController.deleteProduct);


export default productsRouter;

// ----

// import { AppRouter } from "./app.router.js";
// import ProductController from '../controllers/products.controller.js';
// // import { json } from 'express';

// class ProductRouter extends AppRouter{
//     init(){

//         // this.use(json());

//         // GET /
//         this.get("/", ProductController.getProducts);

//         // GET /:pid
//         this.get("/:pid", ProductController.getProductById);

//         // POST /
//         this.post("/",  ProductController.addProduct);

//         // PUT /:pid
//         this.put("/:pid", ProductController.updateProduct);

//         // DELETE /:pid
//         this.delete("/:pid", ProductController.deleteProduct);

//     }
// };

// export { ProductRouter };

// --- 
