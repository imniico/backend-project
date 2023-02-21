import express from 'express';
import ProductManager from './ProductManager.js';


const app = express();
const manager = new ProductManager('./src/data/products.json');


app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();

    if (!limit) {
        res.status(200).send(products);
    } else {
        let limitedProducts = [];
        for (let i = 0; i < limit; i++) {
            if (!products[i]) { break; }
            limitedProducts = [...limitedProducts, products[i]]
        }
        res.status(200).send(limitedProducts);
    }
});

app.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    const products = await manager.getProducts();

    const productFound = products.filter((prod) => prod.id === Number(pid));

    if (productFound.length){
        res.status(200).send(productFound);
    } else {
        res.status(404).send(`Producto con PID:${pid} no encontrado`);
    }

});

app.listen(8080, () => {
    console.log('Server escuchando en 8080');
});
