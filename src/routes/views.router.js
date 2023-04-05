import { Router, json } from 'express';
import ProductManager from '../dao/db-managers/product.manager.js';
import CartManager from '../dao/db-managers/cart.manager.js'

const viewsRouter = Router();
const manager = new ProductManager('./src/data/products.json');
const cartManager = new CartManager();

viewsRouter.use(json());

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", { products })
})

viewsRouter.get("/real-time-products", async (req, res) => {
    // Primera vez, después se actualiza con cada POST usando websockets.
    const products = await manager.getProducts(1000);
    const docs = products.docs;

    res.render("real_time_products", { docs });
})

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat");
})

viewsRouter.get("/products", async (req, res) => {
    const { limit, page, sort, category } = req.query;
    const products = await manager.getProducts(limit, page, sort, category);
    res.render("products", { products });
})

viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    console.log(cart)

    res.render("cart", { cart });
})

//cart cid

export default viewsRouter;