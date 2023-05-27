import { productsDAO } from "../dao/factory.js";
import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from "../dao/dto/product.dto.js";

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
            const result = new GetProductDTO(productFound)
            res.send({ status:"ok", payload: result });
        } else {
            res.send({ status:"error", payload:`Producto con id ${pid} no encontrado` });
        };
    }

    static addProduct = async (req, res, next) => {
        const productDTO = new CreateProductDTO(req.body);        
        const result = await productsDAO.addProduct(productDTO);
    
        //middle-webosockets
        const products = await productsDAO.getProducts(1000);
        req.io.emit("lista-productos", products.docs);
        next();
    
        res.status(201).send({ status:"ok", payload: result });
    }

    static updateProduct = async (req, res) => {
        const { pid } = req.params;
        const productDTO = new UpdateProductDTO(req.body);
    
        const result = await productsDAO.updateProduct(pid, productDTO);
        res.status(201).send({ status:"ok", payload: result });
    }

    static deleteProduct = async (req, res) => {
        const { pid } = req.params;
        const resultado = await productsDAO.deleteProduct(pid);
        res.send(resultado);
    }

}