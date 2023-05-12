import CartManager from "../dao/db-managers/cart.manager.js";

const manager = new CartManager();

export default class CartController{
    
    static getCarts = async (req, res) => {
        const result = await manager.getCarts();
        res.status(200).send({ status:"ok", payload:result });
    }

    static addCart = async (req, res) => {
        const { products } = req.body;
        const newCart = { products }
    
        const result = await manager.addCart(newCart);
        res.send({ status:"ok", payload:result });
    }

    static getCartById = async (req, res) => {
        const { cid } = req.params;
        const result = await manager.getCartById(cid);
    
        res.send({ status:"ok", payload:result });
    }

    static addToCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await manager.addToCart(cid, pid);
    
        res.send({ status:"ok", payload:result });
    }

    static deleteFromCart = async (req, res) => {
        const { cid, pid } = req.params;
        const result = await manager.deleteFromCart(cid, pid);
    
        res.send({ status:"ok", payload: result})
    }

    static updateCart = async (req, res) => {
        const { cid } = req.params;
        const products = req.body;
        console.log(products)
        const result = await manager.updateCart(cid, products);
        
        res.send({ status: "ok", payload: result })
    }

    static updateQuantityInCart = async (req, res) => {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
    
        const result = await manager.updateQuantInCart(cid, pid, quantity)
    
        res.send({ status:"ok", payload: result })
    }

    static clearCart = async (req, res) => {
        const { cid } = req.params;
        const result = await manager.clearCart(cid);
    
        res.send({ status:"ok", payload: result })
    }
}