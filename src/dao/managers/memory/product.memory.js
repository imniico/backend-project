import {v4 as uuidv4} from "uuid";

export class ProductMemory {
    constructor() {
        this.products = [
            {   
                id: "a1",
                title: "Mouse",
                description: "Description Mouse",
                price: 9000,
                code: 123,
                stock: 10,
                category: "Perifericos",
                thumbnails: [],
                stat: true
            },
            {
                id: "b2",
                title: "Auriculares",
                description: "Description Auriculares",
                price: 19000,
                code: 125,
                stock: 20,
                category: "Perifericos",
                thumbnails: [],
                stat: true
            },
            {
                id: "c3",
                title: "Teclado",
                description: "Description Teclado",
                price: 17000,
                code: 127,
                stock: 30,
                category: "Perifericos",
                thumbnails: [],
                stat: true
            }
        ]
    }

    getProducts() {
        return {docs: this.products};
    }

    addProduct(product){
        product.id = uuidv4();
        this.products.push(product);
        return product;
    }

    getProductsById(pid){
        return this.products.find(p => p.id === pid);
    }

    updateProduct(pid, data){
        const found = this.products.find(p => p.id === pid);
        console.log(pid)
        if (found) {
            const keys = Object.keys(data);
            const values = Object.values(data);
            for (let i = 0; i < keys.length; i++){
                found[keys[i]] = values[i];
            }
            return this.products;
        } else {
            return "Producto no existente para modificar";
        }
    }

    deleteProduct(pid){
        this.products = this.products.filter(p => p.id !== pid);
        return {docs: this.products};
    }
}