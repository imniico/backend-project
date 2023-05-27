import { Router, json } from 'express';
import { ProductMongo } from '../dao/managers/mongo/product.mongo.js';
import { CartMongo } from '../dao/managers/mongo/cart.mongo.js';

const viewsRouter = Router();
const manager = new ProductMongo('./src/data/products.json');
const cartManager = new CartMongo();

viewsRouter.use(json());

viewsRouter.get("/", async (req, res) => {
    const products = await manager.getProducts();
    res.render("home", { products })
})

viewsRouter.get("/real-time-products", async (req, res) => {
    // Primera vez, después se actualiza con cada POST usando websockets.
    const products = await manager.getProducts(1000);
    const docs = products.docs;

    res.render("real_time_products", { docs });
})

viewsRouter.get("/chat", async (req, res) => {
    res.render("chat");
})

viewsRouter.get("/products", async (req, res) => {
    const { limit, page, sort, category } = req.query;
    const products = await manager.getProducts(limit, page, sort, category);
    res.render("products", { products, user: req.session.user });
})

viewsRouter.get("/carts/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    console.log(cart)

    res.render("cart", { cart });
})

viewsRouter.get("/login", (req, res) => {
    res.render("login");
})

viewsRouter.get("/signup", (req, res) => {
    res.render("signup");
})

viewsRouter.get("/profile", (req, res) => {
    if (req.user) {
        res.render("profile", { email: req.user.email });
    } else {
        res.send("No logueado!")
    }
})

viewsRouter.get("/failure-signup", (req, res) => {
    res.send("<h1> Error al registrarse! </h1>");
})

viewsRouter.get("/failure-login", (req, res) => {
    res.send("<h1> Error al loguearse! </h1>");
})

export default viewsRouter;