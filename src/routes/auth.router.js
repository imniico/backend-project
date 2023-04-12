import { Router } from 'express';
import UserManager from '../dao/db-managers/user.manager.js';

const router = Router();
const manager = new UserManager();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    const result = await manager.signup(email, password);
    
    if (result) {
        req.session.user = result.email;
        req.session.rol = result.rol;
        res.redirect("/profile");
    } else {
        res.send("Usuario ya registrado!")
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await manager.login(email, password);

    if (result) {
        req.session.user = result;
        res.redirect("/products");
    } else {
        res.send("Usuario o contraseña inválido!");
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy((e) => {
        if (e) { return res.send("La sesión no se puede cerrar"); }
        res.redirect("/login");
    })
})



export default router;