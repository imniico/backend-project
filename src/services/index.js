import { ProductRepository } from "./products.repository.js";
import { productsDAO } from "../dao/factory.js";

export const productService = new ProductRepository(productsDAO);

import { CartRepository } from "./carts.repository.js";
import { cartsDAO } from "../dao/factory.js";

export const cartService = new CartRepository(cartsDAO);