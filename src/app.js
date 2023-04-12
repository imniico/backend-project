// librerias
import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from "connect-mongo";

// utilidades
import __dirname from './utils.js';
import ChatManager from './dao/db-managers/chat.manager.js';

// routes
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import authRouter from "./routes/auth.router.js"

// app
const app = express();
const messages = [];
const chatManager = new ChatManager();

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// uses
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://imniico:imniicopass@nicocluster.9pxn0oe.mongodb.net/ecommerce?retryWrites=true&w=majority"
    }),
    secret: "nicopass",
    resave: true,
    saveUninitialized: true
}));

// middle
app.use((req, res, next) => {
    req.io = io;
    next();
})

// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", authRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(8080, () => {
    console.log('Server escuchando en 8080');
});

// websockets
const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!");

    socket.on("chat-message", (data) => {
        messages.push(data);
        chatManager.addMessage(data);
        io.emit("messages", messages);
    });

    socket.on("new-user", (username) => {
        socket.emit("messages", messages);
        socket.broadcast.emit("new-user", username);
    })
});

// mongodb connect
mongoose
    .connect("mongodb+srv://imniico:imniicopass@nicocluster.9pxn0oe.mongodb.net/ecommerce?retryWrites=true&w=majority")
    .then((conn) => {
        console.log("Conectado a la DB!")
    });
