// import librerias
import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import session from 'express-session';
import MongoStore from "connect-mongo";
import passport from 'passport'; 

// import utilidades
import __dirname from './utils.js';
import ChatMongo from './dao/managers/mongo/chat.mongo.js';
import { initializedPassport } from './config/passport.config.js';
import { config } from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { addLogger } from './utils.js';

// import routes
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import authRouter from "./routes/auth.router.js"

// app & consts
const app = express();
const messages = [];
const chatService = new ChatMongo();
const port = config.server.port;
const mongoUrl = config.mongo.url;
const mongoSessionSecret = config.mongo.secret;

// handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// middlewares
app.use(express.static(__dirname + '/../public'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoUrl
    }),
    secret: mongoSessionSecret,
    resave: true,
    saveUninitialized: true
}));
app.use((req, res, next) => {
    req.io = io;
    next();
})


// passport
initializedPassport(); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(errorHandler); 
app.use(addLogger);

app.get("/loggerTests", (req, res) => {
    req.logger.fatal(`${req.url} - method: ${req.method}`);
    req.logger.error(`${req.url} - method: ${req.method}`);
    req.logger.warning(`${req.url} - method: ${req.method}`);
    req.logger.info(`${req.url} - method: ${req.method}`);
    req.logger.http(`${req.url} - method: ${req.method}`);
    req.logger.debug(`${req.url} - method: ${req.method}`);
    res.send(`Testing de logs en entorno: ${config.env}`)
})


// routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", authRouter);
app.use("/", viewsRouter);


// server
const httpServer = app.listen(port, () => {
    console.log(`Server escuchando en puerto ${port}`);
});

// websockets
const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!");

    socket.on("chat-message", (data) => {
        messages.push(data);
        chatService.addMessage(data);
        io.emit("messages", messages);
    });

    socket.on("new-user", (username) => {
        socket.emit("messages", messages);
        socket.broadcast.emit("new-user", username);
    })
});

