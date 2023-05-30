import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.log("EN ERRORHANDLER");
    switch (error.code) {
        case EError.INVALID_JSON:
            res.send({ status: "error", error: error.cause })
            break;

        case EError.DATABASE_ERROR:
            res.send({ status: "error", error: error.cause })
            break;

        default:
            res.send({ status:"error", message:"Hubo un error" })
            break;
    }
}