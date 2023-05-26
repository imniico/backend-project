import productModel from "../../models/product.model.js";

export class ProductMongo {
    
    constructor() {
        this.model = productModel;
    }

    getProducts = async (limit, page, sort, category) => {
        const products = await this.model.paginate(

            category ? { category: category } : {}
            ,
            {
                limit: limit ? Number(limit) : 10,
                page: page ? page : 1,
                sort: sort ? { price: sort === "asc" ? 1 : -1 } : { _id: 1 },
                lean: true
            }
        );
        
        let queryURL = category ? `category=${category}` : undefined;
        return {...products, sort, queryURL};
    }

    addProduct = async (product) => {
        const products = await this.model.find().lean();

        const validarCode = products.find((prod) => Number(prod.code) === Number(product.code))
        if (validarCode) { return `Ya existe producto con code ${product.code}!`; }

        const result = await this.model.create(product);
        return result;
    }

    getProductsById = async (pid) => {
        if (pid.length != 24) {
            return "";
        }
        const prodEncontrado = await this.model.findOne({ _id: pid });
        return prodEncontrado;
    }

    updateProduct = async (pid, product) => {
        if (pid.length != 24) {
            return "ID Inválido";
        }

        const updatedProduct = await this.model.findOneAndUpdate(
            { _id: pid },
            product,
            { new: true }
        )
        return updatedProduct;
    }

    deleteProduct = async (pid) => {
        try {
            const result = await this.model.deleteOne({ _id: pid })
            return result;
        } catch (err) {
            return err.message;
        }

    }
}