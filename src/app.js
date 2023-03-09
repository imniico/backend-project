import express, { urlencoded } from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import __dirname from './utils.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.io = io;
    next();
})

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Server escuchando en 8080');
});

const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!");
});
