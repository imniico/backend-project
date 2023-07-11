import { CreateProductDTO, GetProductDTO, UpdateProductDTO } from "../dao/dto/product.dto.js";

export class ProductRepository{
    constructor(dao){
        this.dao = dao;
    };

    async getProducts(limit, page, sort, category){
        const products = await this.dao.getProducts(limit, page, sort, category);
        return products;
    }

    async getProductById(pid){
        const result = await this.dao.getProductById(pid);
        return result;
    }

    async addProduct(product){
        const productDTO = new CreateProductDTO(product);
        const result = await this.dao.addProduct(productDTO);
        return result;
    }

    async updateProduct(pid, product){
        const productDTO = new UpdateProductDTO(product);
        const result = await this.dao.updateProduct(pid, productDTO);
        return result;
    }

    async deleteProduct(pid){
        const result = await this.dao.deleteProduct(pid)
        return result;
    }

    
}