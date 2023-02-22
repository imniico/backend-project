import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();
const manager = new ProductManager('./src/data/products.json');


app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();

    limit ? res.status(200).send(products.slice(0, limit)) : res.send(products);
});

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const productFound = await manager.getProductsById(Number(pid));
    res.send(productFound);

});

app.listen(8080, () => {
    console.log('Server escuchando en 8080');
});
