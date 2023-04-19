import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";

const initializedPassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {

            try {
                const user = await userModel.findOne({ email: username })
                if (user) { return done(null, false); }
                let rol;
                const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;
                regex.test(username) ? rol = "admin" : rol = "usuario";
                const newUser = {
                    email: username,
                    password: createHash(password),
                    rol
                };
                const userCreated = await userModel.create(newUser);
                // req.session.user = result.email;
                // req.session.rol = result.rol;
                // console.log(req.session)
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async(req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                console.log(user)
                console.log(password)
                if (user && isValidPassword(user, password)){
                    return done(null, user);
                } else {
                    return done(null, false);
                }                
            } catch (error) {
                return done(error);
            }
        }
    ))

    // Serializar y Deserializar
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        return done(null, user); // se guarda en req.user
    })
}

export { initializedPassport }
