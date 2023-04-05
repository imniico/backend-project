import { Router, json } from 'express';
import CartManager from '../dao/db-managers/cart.manager.js';

const cartsRouter = Router();
const manager = new CartManager("./src/data/carts.json")

cartsRouter.use(json());


// GET /
cartsRouter.get("/", async (req, res) => {
    const result = await manager.getCarts();
    res.status(200).send({ status:"ok", payload:result });
})


// POST /
cartsRouter.post("/", async (req, res) => {
    const { products } = req.body;
    const newCart = { products }

    const result = await manager.addCart(newCart);
    res.send({ status:"ok", payload:result });
});


// GET /:cid
cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const result = await manager.getCartById(cid);

    res.send({ status:"ok", payload:result });
});


// POST /:cid/product/:pid
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const result = await manager.addToCart(cid, pid);

    res.send({ status:"ok", payload:result });
})


// DELETE /:cid/producs/:pid
cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const result = await manager.deleteFromCart(cid, pid);

    res.send({ status:"ok", payload: result})
})


// PUT /:cid 
cartsRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const products = req.body;
    console.log(products)
    const result = await manager.updateCart(cid, products);
    
    res.send({ status: "ok", payload: result })
})


// PUT /:cid/products/:pid 
cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const result = await manager.updateQuantInCart(cid, pid, quantity)

    res.send({ status:"ok", payload: result })
})


// DELETE /:cid - deberá eliminar todos los productos del carrito 
cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params;
    const result = await manager.clearCart(cid);

    res.send({ status:"ok", payload: result })
})


export default cartsRouter;