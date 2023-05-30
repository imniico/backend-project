import { productService } from "../services/index.js";
import { generateProduct } from "../utils.js";
import { CustomError } from "../services/customError.service.js";
import { EError } from "../enums/EError.js";
import { generateProductErrorInfo } from "../services/productErrorInfo.js";


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
        
        if(result.title){
            res.send({ status:"ok", payload: result });
        } else {
            res.send({ status:"error", payload:`Producto con id ${pid} no encontrado` });
        };
    }

    static addProduct = async (req, res, next) => {     
        const { title, description, price, code, stock, category} = req.body;
        if(!title || !description || !price || !code || !stock || !category ){
            CustomError.createError({
                name:"Product Create Error",
                cause: generateProductErrorInfo(req.body),
                message: "Error creando el producto",
                errorCode: EError.INVALID_JSON
            });
        };

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

    static getMockingProducts = async (req, res) => {
        const cant = parseInt(req.query.cant) || 100;
        let result = [];
        for (let i = 0; i < cant; i++) {
            result.push(generateProduct())           
        }
        
        res.send(result);
    }

}