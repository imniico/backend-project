import { Router } from 'express';
import UserManager from '../dao/db-managers/user.manager.js';
import passport from 'passport';


const router = Router();
const manager = new UserManager();

router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"/failure-signup"
}), (req, res) => {
    res.redirect("/profile")
})

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const result = await manager.login(email, password);

//     if (result) {
//         req.session.user = result;
//         res.redirect("/products");
//     } else {
//         res.send("Usuario o contraseña inválido!");
//     }
// })

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/failure-login"
}), (req, res) => {
    res.redirect("/profile");
})

router.post("/logout", (req, res) => {
    req.session.destroy((e) => {
        if (e) { return res.send("La sesión no se puede cerrar"); }
        res.redirect("/login");
    })
})

export default router;