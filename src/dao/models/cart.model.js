import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    products: [
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
            quantity:{
                type: Number
            }
        }
    ]
});

// middles
cartsSchema.pre("findOne", function() {
    this.populate("products.product");
});
cartsSchema.pre("find", function() {
    this.populate("products.product");
});

const cartModel = mongoose.model("carts", cartsSchema);
export default cartModel;

