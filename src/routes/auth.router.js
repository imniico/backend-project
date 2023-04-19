import { Router } from 'express';
import UserManager from '../dao/db-managers/user.manager.js';
import passport from 'passport';

const router = Router();
const manager = new UserManager();

router.post("/signup", passport.authenticate("signupStrategy", {
    failureRedirect:"/failure-signup"
}), (req, res) => {
    res.redirect("/profile");
})

router.post("/login", passport.authenticate("loginStrategy",{
    failureRedirect:"/failure-login"
}), (req, res) => {
    res.redirect("/profile");
})

router.post("/logout", (req, res) => {
    req.logOut((e) => {
        if(e) return res.send("No se pudo cerrar la sesión!");
        req.session.destroy((e) => {
            if(e) return res.send("No se pudo cerrar la sesión!");
            res.redirect("/login");
        })
    })
})

router.get("/github", passport.authenticate("githubSignup"));

router.get("/github-callback", passport.authenticate("githubSignup",{
    failureRedirect:"/failure-signup"
}),(req, res) => {
    res.redirect("/profile");
});

router.get("/githublogin", passport.authenticate("githubLogin"));

router.get("/github-callback-login", passport.authenticate("githubLogin",{
    failureRedirect:"/failure-login"
}),(req, res) => {
    res.redirect("/profile");
});

export default router;

