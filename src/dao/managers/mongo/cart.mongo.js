import cartModel from "../../models/cart.model.js";

export class CartMongo{
    constructor(){
        this.model = cartModel;
    }

    getCarts = async () => {
        const carts = await this.model.find();
        return carts;
    }

    addCart = async (cart) => {
        const result = await this.model.create(cart);
        return result;
    }

    getCartById = async (cid) => {
        if (cid.length != 24){ return "ID Inválido"; }

        const cartEncontrado = await this.model.findById(cid).lean();
        return cartEncontrado;
    }

    addToCart = async (cid, pid) => {
        if (cid.length != 24 ){ return "ID Inválido de Carrito"}
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }
        
        cart.products.forEach((a) => {
            console.log(a.product);
        })

        const existingProduct = cart.products.find((p) => p.product.id === pid);

        let updatedProducts;
        if (existingProduct){
            updatedProducts = cart.products.map((p) => {
                if (p.product.id === pid){
                    return{
                        ...p,
                        quantity: p.quantity + 1,
                    };
                }
                return p;
            });
        } else {
            updatedProducts = [...cart.products, { id: pid, quantity: 1 }]
        }

        cart.products = updatedProducts;
        cart.save();
        return cart.products;
        
    }

    deleteFromCart = async (cid, pid) => {
        if (cid.length != 24 ){ return "ID Inválido de Carrito"}
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }

        const existingProduct = cart.products.find((p) => p.product.id === pid);
        
        if (existingProduct){
            cart.products.pull(existingProduct);
        }

        cart.save();
        return cart.products;
    }

    updateCart = async (cid, prods) => {
        if (cid.length != 24 ){ return "ID Inválido de Carrito"}
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }

        prods.map((prod) => {
            cart.products.push({
                product: prod.product,
                quantity: prod.quantity
            })
        })

        cart.save();
        return cart.products;
        
    }

    updateQuantInCart = async (cid, pid, quant) => {
        if (cid.length != 24 ){ return "ID Inválido de Carrito"}
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }

        const existingProduct = cart.products.find((p) => p.product.id === pid);
        if (Number(quant) || !Number(quant) <= 0 ){
            existingProduct.quantity = quant
        } else {
            return "Cantidad inválida";
        }
       
        cart.save();
        return cart.products;

    }

    clearCart = async (cid) => {
        if (cid.length != 24 ) { return "ID Inválido de Carrito" }
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }

        cart.products = [];
        cart.save();

        return cart.products;
    }
}

