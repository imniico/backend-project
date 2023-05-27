import { cartService } from "../repository/index.js";

export default class CartController{
    
    static getCarts = async (req, res) => {
        const result = await cartService.getCarts();
        res.status(200).send({ status:"ok", payload: result });
    }

    static addCart = async (req, res) => {
        const { products } = req.body;
        const newCart = { products }
        const result = await cartService.addCart(newCart);

        res.send({ status:"ok", payload:result });
    }

    static getCartById = async (req, res) => {
        const { cid } = req.params;
        const result = await cartService.getCartById(cid);
    
        res.send({ status:"ok", payload: result });
    }

    static addToCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await cartService.addToCart(cid, pid);
    
        res.send({ status:"ok", payload:result });
    }

    static deleteFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await cartService.deleteFromCart(cid, pid);
    
        res.send({ status:"ok", payload: result})
    }

    static updateCart = async (req, res) => {
        const { cid } = req.params;
        const products = req.body;
        
        const result = await cartService.updateCart(cid, products);
        
        res.send({ status: "ok", payload: result })
    }

    static updateQuantityInCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        const result = await cartService.updateQuantInCart(cid, pid, quantity)
    
        res.send({ status:"ok", payload: result })
    }

    static clearCart = async (req, res) => {
        const { cid } = req.params;
        const result = await cartService.clearCart(cid);
    
        res.send({ status:"ok", payload: result })
    }
}