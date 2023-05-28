import { Router, json } from 'express';
import CartController from '../controllers/carts.controller.js';
import { checkRole } from '../middlewares/auth.js';

const cartsRouter = Router();
cartsRouter.use(json());

// GET /
cartsRouter.get("/", CartController.getCarts);

// POST /
cartsRouter.post("/", CartController.addCart);

// GET /:cid
cartsRouter.get("/:cid", CartController.getCartById);

// POST /:cid/product/:pid
cartsRouter.post("/:cid/product/:pid", checkRole(["user"]), CartController.addToCart)

// DELETE /:cid/producs/:pid
cartsRouter.delete("/:cid/product/:pid", checkRole(["user"]), CartController.deleteFromCart)

// PUT /:cid 
cartsRouter.put("/:cid", checkRole(["user"]), CartController.updateCart)

// PUT /:cid/products/:pid 
cartsRouter.put("/:cid/product/:pid", checkRole(["user"]), CartController.updateQuantityInCart)

// DELETE /:cid
cartsRouter.delete("/:cid", checkRole(["user"]), CartController.clearCart)

// POST /:cid/purchase
cartsRouter.post("/:cid/purchase", checkRole(["user"]), CartController.purchase)

export default cartsRouter;