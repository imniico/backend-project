import fs from "fs";

export default class ProductManager {

    #path;

    constructor(path) {
        this.#path = path;
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(products);
        } catch (e) {
            return [];
        }
    }

    async addProduct(product) {
        const products = await this.getProducts();
        const lastProduct = products[products.length-1];
        const newId = lastProduct ? lastProduct.id + 1 : 0;
        
        const nuevoProducto = {
            id: products.length ? newId : 0,
            ...product,
            thumbnails: [],
            status: true
        }

        const validarCode = products.find((prod) => prod.code === nuevoProducto.code)
        if (validarCode) {
            console.log(`Ya existe producto con code ${nuevoProducto.code}!`)
            return;
        }

        const updatedProducts = [...products, nuevoProducto];
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
    }

    async getProductsById(id) {
        const products = await this.getProducts();
        const prodEncontrado = products.find((prod) => id === prod.id);
        
        if (prodEncontrado) {
            return prodEncontrado;
        }
        return `Producto con ID:${id} no encontrado`;
    }

    async updateProduct(id, obj) {
        const products = await this.getProducts();
        const product = products.find((prod) => id === prod.id);
        
        if (product) {
            const keys = Object.keys(obj);
            const values = Object.values(obj);
            for (let i = 0; i < keys.length; i++){
                product[keys[i]] = values[i];
            }
            await fs.promises.writeFile(this.#path, JSON.stringify(products));
        } else {
            console.log("Producto no existente para modificar");
        }
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const product = products.find((prod) => id === prod.id);
        
        if (product){
            const updatedProducts = products.filter((prod) => prod.id != id);
            await fs.promises.writeFile(this.#path, JSON.stringify(updatedProducts));
        } else {
            console.log("Producto no existe para eliminar");
        }
    }
}
