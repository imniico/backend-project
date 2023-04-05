import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }, 
    price:{
        type: Number,
        required: true
    },
    code:{
        type: Number,
        required: true,
        unique: true
    },
    stock:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    thumbnails:{
        type: Array,
        default: []
    },
    stat:{
        type: Boolean,
        default: true
    }
});

productsSchema.plugin(mongoosePaginate);

const productModel = mongoose.model("products", productsSchema);
export default productModel;