import fs from "fs";

export default class CartManager {

    #path;

    constructor(path) {
        this.#path = path;
    }

    async getCarts() {
        try {
            const carts = await fs.promises.readFile(this.#path, "utf-8");
            return JSON.parse(carts);
        } catch (e) {
            return [];
        }
    }

    async addCart(cart) {
        const carts = await this.getCarts();
        const lastCart = carts[carts.length - 1];
        const newId = lastCart ? lastCart.id + 1 : 0;

        const newCart = {
            id: carts.length ? newId : 0,
            ...cart
        }

        const updatedCarts = [...carts, newCart];
        await fs.promises.writeFile(this.#path, JSON.stringify(updatedCarts));
    }

    async getCartById(id) {
        const carts = await this.getCarts();
        const cartEncontrado = carts.find((cart) => id === cart.id);

        if (cartEncontrado) {
            return cartEncontrado;
        }
        return `Carrito con ID:${id} no encontrado`;
    }

    async addToCart(cid, pid){
        const carts = await this.getCarts();
        const cart = carts.find((cart) => cid === cart.id);

        if (cart){
            const prodInCart = cart.products.find((prod) => pid === prod.id);
            if (prodInCart){
                prodInCart.quantity++;
            } else {
                const newProduct = { id: pid, quantity: 1 };
                cart.products = [ ...cart.products, newProduct ];
            }
            
            await fs.promises.writeFile(this.#path, JSON.stringify(carts));
            return true;
            
        } else {
            console.log("Carrito no existente para agregar el producto")
            return false;
        }
    }



}