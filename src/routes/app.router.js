import { Router } from "express";
import jwt from "jsonwebtoken";

class AppRouter{
    #router;

    constructor(){
        this.#router = Router();
        this.init();
    }

    getRouter(){
        return this.#router;
    };

    init(){};

    get(path, policies, ...callbacks){
        this.#router.get(path, this.#handlePolicies, this.#addCustomResponse, this.#applyCallbacks(callbacks));
    }

    post(path, policies, ...callbacks){
        this.#router.post(path, this.#handlePolicies, this.#addCustomResponse, this.#applyCallbacks(callbacks));
    }

    put(path, policies, ...callbacks){
        this.#router.put(path, this.#handlePolicies, this.#addCustomResponse, this.#applyCallbacks(callbacks));
    }

    delete(path, policies, ...callbacks){
        this.#router.delete(path, this.#handlePolicies, this.#addCustomResponse, this.#applyCallbacks(callbacks));
    }

    #applyCallbacks(callbacks){
        return callbacks.map(callback => async (...params) => {
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error);
                params[1].status(500).send(error.message);
            }
        })
    };

    #addCustomResponse(req, res, next){
        res.sendSuccess = (payload) => res.json({ status:"success", payload });
        res.sendClientError = (error) => res.json({ status:"error", error: error.message })
        next();
    }

    #handlePolicies(roles){
        return (req, res, next) => {
           
            if (roles.includes("public")){
                next();
            }

            const authHeader = req.headers.authorization;
            if(!authHeader){
                return res.status(401).json( { status:"error", message:"Falta autenticación" })
            }

            const token = authHeader.split(" ")[1];
            jwt.verify(token, "NicoToken", (error, info) => {
                if (error){
                    return res.status(401).json( { status:"error", message:"No autorizado" })
                }
                if (!roles.includes(info.role)){
                    return res.status(403).json( { status:"error", message:"Acceso prohibido" })
                }
                req.user = info;
                next();
            });

        }
    }

}

export { AppRouter };