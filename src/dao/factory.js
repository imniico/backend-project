import { config } from "../config/config.js";

const persistence = config.server.persistence;

let productsDAO;

switch(persistence){
    
    case "mongo":
        const { connectDB } = await import("../config/dbConnection.js");
        connectDB();
        const { ProductMongo } = await import('../dao/managers/mongo/product.mongo.js');
        productsDAO = new ProductMongo();
        break;
    
        case "memory":
        const { ProductMemory } = await import('../dao/managers/memory/product.memory.js');
        productsDAO = new ProductMemory();
        break;
};

export { productsDAO } 