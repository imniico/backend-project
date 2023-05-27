import cartModel from "../../models/cart.model.js";
import ticketModel from "../../models/ticket.model.js";
import productModel from "../../models/product.model.js";
import {v4 as uuid} from "uuid";

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

    purchase = async (cid, user) => {
        if (cid.length != 24 ){ return "ID Inválido de Carrito" }
        
        const cart = await this.model.findById(cid);
        if (!cart){ return "Carrito no encontrado" }
        if (cart.products.length === 0) { return "Carrito vacío" }

        let ticketProducts = [];
        let ticketCreated;
        let rejectedProducts = [];
        let sinStock = [];
    
        for (let i = 0; i < cart.products.length; i++) {
            let cartItem = cart.products[i];
            let productDB = cartItem.product;
            
            if (cartItem.quantity <= productDB.stock){
                ticketProducts.push(cartItem);
            } else {
                rejectedProducts.push(cartItem);
            }
        }

        if (ticketProducts.length != 0){

            // TICKET
            const ticket = {
                code: uuid(),
                purchase_datetime: Date.now(),
                amount: ticketProducts.reduce((total, item) => total + item.quantity * item.product.price, 0),
                purcharser: "user@gmail.com" //user
                //No puedo loguear desde el Postman, por lo tanto no existe el req.user.email, debería estar aca
            }
            ticketCreated = await ticketModel.create(ticket);

            // ACTUALIZACIÓN STOCK
            ticketProducts.forEach(async (p) => {
                await productModel.findOneAndUpdate(
                    { _id: p.product._id },
                    { stock: p.product.stock - p.quantity },
                    { new: true }
                )
            })

            // ACTUALIZAR CARRITO
            cart.products = rejectedProducts;
            cart.save();

        } 
        if (rejectedProducts.length != 0){
            rejectedProducts.forEach((p) => {
                sinStock.push(p.product._id)
            })
        }
        
        return {ticket: ticketCreated, sinStock: sinStock}
        
    }
}

