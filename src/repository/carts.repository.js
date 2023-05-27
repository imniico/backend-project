export class CartRepository{
    constructor(dao){
        this.dao = dao;
    }

    async getCarts(){
        const carts = await this.dao.getCarts();
        return carts;
    }

    async addCart(cart){
        const result = await this.dao.addCart(cart);
        return result;
    }

    async getCartById(cid){
        const result = await this.dao.getCartById(cid);
        return result;
    }

    async addToCart(cid, pid){
        const result = await this.dao.addToCart(cid, pid);
        return result;
    }

    async deleteFromCart(cid, pid){
        const result = await this.dao.deleteFromCart(cid, pid);
        return result;
    }

    async updateCart(cid, products){
        const result = await this.dao.updateCart(cid, products);
        return result;
    }

    async updateQuantityInCart(cid, pid, quant){
        const result = await this.dao.updateQuantityInCart(cid, pid, quant);
        return result;
    }

    async clearCart(cid){
        const result = await this.dao.clearCart(cid);
        return result;
    }
}