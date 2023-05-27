import { productService } from "../services/index.js";

export default class ProductController{
    
    static getProducts = async (req, res) => {
        const { limit, page, sort, category } = req.query;
        const products = await productService.getProducts(limit, page, sort, category);
        const { docs, ...pagination } = products;
        
        res.send({ status:"ok", payload: docs, ...pagination});
    }

    static getProductById = async (req, res) => {
        const { pid } = req.params;
        const result = await productService.getProductById(pid);
        
        if(result){
            res.send({ status:"ok", payload: result });
        } else {
            res.send({ status:"error", payload:`Producto con id ${pid} no encontrado` });
        };
    }

    static addProduct = async (req, res, next) => {      
        const result = await productService.addProduct(req.body);
    
        //middle-webosockets
        const products = await productService.getProducts(1000);
        req.io.emit("lista-productos", products.docs);
        next();
    
        res.status(201).send({ status:"ok", payload: result });
    }

    static updateProduct = async (req, res) => {
        const { pid } = req.params;
        const result = await productService.updateProduct(pid, req.body);

        res.status(201).send({ status:"ok", payload: result });
    }

    static deleteProduct = async (req, res) => {
        const { pid } = req.params;
        const result = await productService.deleteProduct(pid);

        res.send(result);
    }

}