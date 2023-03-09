import { Router, json } from 'express';
import ProductManager from '../ProductManager.js';

const viewsRouter = Router();
const manager = new ProductManager('./src/data/products.json');

viewsRouter.use(json());

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", { products })
})

viewsRouter.get("/real-time-products", async (req, res) => {
    // Primera vez, después se actualiza con cada POST usando websockets.
    const products = await manager.getProducts();
    res.render("real_time_products", { products });
})

export default viewsRouter;