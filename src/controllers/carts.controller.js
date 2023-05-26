// import CartManager from "../dao/managers/cart.manager.js";
import CartMongo from "../dao/managers/mongo/cart.mongo.js";

const cartsService = new CartMongo();

export default class CartController{
    
    static getCarts = async (req, res) => {
        const result = await cartsService.getCarts();
        res.status(200).send({ status:"ok", payload:result });
    }

    static addCart = async (req, res) => {
        const { products } = req.body;
        const newCart = { products }
    
        const result = await cartsService.addCart(newCart);
        res.send({ status:"ok", payload:result });
    }

    static getCartById = async (req, res) => {
        const { cid } = req.params;
        const result = await cartsService.getCartById(cid);
    
        res.send({ status:"ok", payload:result });
    }

    static addToCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await cartsService.addToCart(cid, pid);
    
        res.send({ status:"ok", payload:result });
    }

    static deleteFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await cartsService.deleteFromCart(cid, pid);
    
        res.send({ status:"ok", payload: result})
    }

    static updateCart = async (req, res) => {
        const { cid } = req.params;
        const products = req.body;
        console.log(products)
        const result = await cartsService.updateCart(cid, products);
        
        res.send({ status: "ok", payload: result })
    }

    static updateQuantityInCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        const result = await cartsService.updateQuantInCart(cid, pid, quantity)
    
        res.send({ status:"ok", payload: result })
    }

    static clearCart = async (req, res) => {
        const { cid } = req.params;
        const result = await cartsService.clearCart(cid);
    
        res.send({ status:"ok", payload: result })
    }
}