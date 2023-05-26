import { productsDAO } from "../dao/factory.js"

export default class ProductController{
    
    static getProducts = async (req, res) => {
        const { limit, page, sort, category } = req.query;
        const products = await productsDAO.getProducts(limit, page, sort, category);
    
        const { docs, ...pagination } = products;
        
        res.send({ status:"ok", payload: docs, ...pagination});
    }

    static getProductById = async (req, res) => {
        const { pid } = req.params;
        const productFound = await productsDAO.getProductsById(pid);
        
        if(productFound){
            res.send({ status:"ok", payload: productFound });
        } else {
            res.send({ status:"error", payload:`Producto con id ${pid} no encontrado` });
        };
    }

    static addProduct = async (req, res, next) => {
        const { title, description, price, code, stock, category } = req.body;
        const result = await productsDAO.addProduct({ title, description, price, code, stock, category });
    
        //middle-webosockets
        const products = await productsDAO.getProducts(1000);
        req.io.emit("lista-productos", products.docs);
        next();
    
        res.status(201).send({ status:"ok", payload: result });
    }

    static updateProduct = async (req, res) => {
        const { pid } = req.params;
        const { title, description, price, code, stock, category, thumbnails, status } = req.body;
        const updatedProductData = { title, description, price, code, stock, category, thumbnails, status }
    
        const result = await productsDAO.updateProduct(pid, updatedProductData);
        res.status(201).send({ status:"ok", payload: result });
    }

    static deleteProduct = async (req, res) => {
        const { pid } = req.params;
        const resultado = await productsDAO.deleteProduct(pid);
        res.send(resultado);
    }

}