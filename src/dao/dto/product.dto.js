export class CreateProductDTO{
    constructor(product){
        this.title = product.title || "";
        this.description = product.description || "";
        this.price = product.price || -1;
        this.code = product.code || -1;
        this.stock = product.stock || -1;
        this.category = product.category || "";
    }
}

export class GetProductDTO{
    constructor(productDB){
        this.title = productDB.title;
        this.code = productDB.code;
        this.price = productDB.price;
        this.stock = productDB.stock;
        this.category = productDB.category;
    }
}

export class UpdateProductDTO{
    constructor(product){
        this.title = product.title || undefined;
        this.description = product.description || undefined;
        this.price = product.price || undefined;
        this.code = product.code || undefined;
        this.stock = product.stock || undefined;
        this.category = product.category || undefined;
        this.thumbnails = product.thumbnails || undefined;
        this.status = product.status || undefined;

    }
}

