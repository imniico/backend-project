import { Router, json } from 'express';
import CartController from '../controllers/carts.controller.js';

const cartsRouter = Router();
cartsRouter.use(json());

// GET /
cartsRouter.get("/", CartController.getCarts);

// POST /
cartsRouter.post("/", CartController.addCart);

// GET /:cid
cartsRouter.get("/:cid", CartController.getCartById);

// POST /:cid/product/:pid
cartsRouter.post("/:cid/product/:pid", CartController.addToCart)

// DELETE /:cid/producs/:pid
cartsRouter.delete("/:cid/product/:pid", CartController.deleteFromCart)

// PUT /:cid 
cartsRouter.put("/:cid", CartController.updateCart)

// PUT /:cid/products/:pid 
cartsRouter.put("/:cid/product/:pid", CartController.updateQuantityInCart)

// DELETE /:cid
cartsRouter.delete("/:cid", CartController.clearCart)

export default cartsRouter;