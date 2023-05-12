import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { config } from './config.js';

const initializedPassport = () => {
    passport.use("signupStrategy", new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })
                if (user) {
                    return done(null, false);
                }
                let rol;
                const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;
                regex.test(username) ? rol = "superadmin" : rol = "usuario";
                const newUser = {
                    email: username,
                    password: createHash(password),
                    rol
                };
                const userCreated = await userModel.create(newUser);
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
        async (req, username, password, done) => {
            try {
                const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;

                if (regex.test(username)) {
                    if (username === config.auth.acc && password === config.auth.pwd) {
                        // un unico superadmin (el que esta en .env)
                        const superadmin = await userModel.findOne({ email: username })
                        return done(null, superadmin);
                    } else { 
                        // aca entra si tiene @coder, pero no es el de .env, no loguea
                        return done(null, false);
                    }
                } else { // aca entra cualquier usuario
                    const user = await userModel.findOne({ email: username })
                    if (user && isValidPassword(user, password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                }

            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("githubSignup", new GithubStrategy(
        {
            clientID: "Iv1.c3a4c189d177e207",
            clientSecret: "3fcb82a1434e14fb85fa30a1c2574fdb3aad3e10",
            callbackURL: "http://localhost:8080/api/sessions/github-callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const userExists = await userModel.findOne({ email: profile.username })
                if (userExists) {
                    return done(null, false) // userExists
                }
                // let rol;
                // const regex = /^[a-zA-Z0-9._%+-]+@coder\.com$/;
                // regex.test(profile.username) ? rol = "admin" : rol = "usuario";
                const newUser = {
                    email: profile.username,
                    password: createHash(profile.id),
                    rol: "usuario" // hardcoded 
                };
                const userCreated = await userModel.create(newUser);
                return done(null, userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ))

    passport.use("githubLogin", new GithubStrategy(
        {
            clientID: "Iv1.c3a4c189d177e207",
            clientSecret: "3fcb82a1434e14fb85fa30a1c2574fdb3aad3e10",
            callbackURL: "http://localhost:8080/api/sessions/github-callback-login"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ email: profile.username })
                if (user && isValidPassword(user, profile.id)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error);
            }
        }
    ));

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
