import { Router, json } from 'express';
import ProductManager from '../dao/db-managers/product.manager.js';

const productsRouter = Router();
const manager = new ProductManager('./src/data/products.json');

productsRouter.use(json());


// GET /
productsRouter.get("/", async (req, res) => {
    const { limit, page, sort, category } = req.query;
    const products = await manager.getProducts(limit, page, sort, category);

    const { docs, ...pagination } = products;
    
    res.send({ status:"ok", payload: docs, ...pagination});
});


// GET /:pid
productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const productFound = await manager.getProductsById(pid);
    
    if(productFound){
        res.send({ status:"ok", payload: productFound });
    } else {
        res.send({ status:"error", payload:`Producto con id ${pid} no encontrado` });
    };
});


// POST /
productsRouter.post("/", async (req, res, next) => {
    const { title, description, price, code, stock, category } = req.body;
    const result = await manager.addProduct({ title, description, price, code, stock, category });

    //middle-webosockets
    const products = await manager.getProducts(1000);
    req.io.emit("lista-productos", products.docs);
    next();

    res.status(201).send({ status:"ok", payload: result });
});


// PUT /:pid
productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, code, stock, category, thumbnails, status } = req.body;
    const updatedProductData = { title, description, price, code, stock, category, thumbnails, status }

    const result = await manager.updateProduct(pid, updatedProductData);
    res.status(201).send({ status:"ok", payload: result });
})


// DELETE /:pid
productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const resultado = await manager.deleteProduct(pid);
    res.send(resultado);
})


export default productsRouter;