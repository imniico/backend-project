import mongoose from "mongoose";
import chai from "chai";
import { ProductMongo } from "../src/dao/managers/mongo/product.mongo.js";
import productModel from "../src/dao/models/product.model.js";

const expect = chai.expect;

// Contexto
describe("Testing para la clase ProductMongo", () => {

    before(function(){
        mongoose.connect("mongodb+srv://imniico:imniicopass@nicocluster.9pxn0oe.mongodb.net/ecommerce?retryWrites=true&w=majority");
        this.productsDao = new ProductMongo();
    })

    it("Metodo getProducts debe retornar un objeto con un array 'docs' (productos) e información de paginación", async function(){
        const result = await this.productsDao.getProducts();
        const products = result.docs;
        
        expect(Array.isArray(products)).to.be.ok;
    })

    it("El dao debe ingresar un producto correctamente en la base de datos (devolver el producto con un id)", async function(){
        let mockProduct = {
            title: "Teclado",
            description: "Teclado Nuevo",
            price: 5000,
            code: 111198, //unico
            stock: 20,
            category: "Perifericos"
        }
        const result = await this.productsDao.addProduct(mockProduct);

        expect(result).to.have.property("_id");
    })

    it("Al agregar un producto se debe crear con un array de 'thumbnails' vacío", async function(){
        let mockProduct = {
            title: "Teclado",
            description: "Teclado Nuevo",
            price: 5000,
            code: 882996, //unico
            stock: 20,
            category: "Perifericos"
        }
        const result = await this.productsDao.addProduct(mockProduct);
        const productDB = await productModel.findOne({ _id: result._id })
        
        expect(productDB.thumbnails).to.be.deep.equal([]);
    })

    after(async function(){
        await mongoose.connection.close();
    })

});