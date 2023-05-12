import passport from 'passport';

export default class AuthController{

    // AUTH PROPIO
    static signup = passport.authenticate("signupStrategy", {
        failureRedirect:"/failure-signup"
    })
   
    static login = passport.authenticate("loginStrategy",{
        failureRedirect:"/failure-login"
    })
    
    static logout = (req, res) => {
        req.logOut((e) => {
            if(e) return res.send("No se pudo cerrar la sesión!");
            req.session.destroy((e) => {
                if(e) return res.send("No se pudo cerrar la sesión!");
                res.redirect("/login");
            })
        })
    }

    // AUTH GITHUB
    static githubSignup = passport.authenticate("githubSignup")

    static githubSignupCB = passport.authenticate("githubSignup", { failureRedirect:"/failure-signup" })
    
    static githubLogin = passport.authenticate("githubLogin")
    
    static githubLoginCB = passport.authenticate("githubLogin", { failureRedirect:"/failure-login" })

    // REDIRECT
    static redirectProfile = (req, res) => {
        res.redirect("/profile");
    }

    
}