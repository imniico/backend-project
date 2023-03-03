import { Router, json } from 'express';
import CartManager from '../CartManager.js';

const cartsRouter = Router();
const manager = new CartManager("./src/data/carts.json")

cartsRouter.use(json());

cartsRouter.get("/", (req, res) => {
    res.send("Hola"); // BORRAR
})


// POST /
cartsRouter.post("/", async (req, res) => {
    const { products } = req.body;
    const newCart = { products }

    manager.addCart(newCart);
    res.send(newCart);
});


// GET /:cid
cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cartFound = await manager.getCartById(Number(cid));

    res.send(cartFound);
});


// POST /:cid/product/:pid
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const resultado = await manager.addToCart(Number(cid), Number(pid));

    if (resultado){
        res.send(`Producto id ${pid} agregado al carrito id ${cid}`);
    } else {
        res.send(`Carrito con id ${cid} no encontrado`);
    }
  
})


export default cartsRouter;