import { Router, json } from 'express';
import ProductManager from '../ProductManager.js';

const productsRouter = Router();
const manager = new ProductManager('./src/data/products.json');

productsRouter.use(json());


// GET /
productsRouter.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    
    limit ? res.status(200).send(products.slice(0, limit)) : res.send(products);
});


// GET /:pid
productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productFound = await manager.getProductsById(Number(pid));

    res.send(productFound);
});


// POST /
productsRouter.post("/", async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;
    const newProduct = { title, description, price, code, stock, category }

    manager.addProduct(newProduct);
    res.send(newProduct);
});


// PUT /:pid
productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, code, stock, category, thumbnails, status } = req.body;
    const updatedProduct = { title, description, price, code, stock, category, thumbnails, status }

    manager.updateProduct(Number(pid), updatedProduct);
    res.send({ pid, ...updatedProduct });
})


// DELETE /:pid
productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    manager.deleteProduct(Number(pid));
})


export default productsRouter;