import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
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
                const {first_name, last_name, age} = req.body
                const user = await userModel.findOne({ email: username })
                if (user) { return done(null, false); }
                
                let role = "user";
                if(username.endsWith("@coder.com")){
                    role = "admin";
                }
                                
                const newUser = {
                    first_name,
                    last_name,
                    email: username,
                    age,
                    password: createHash(password),
                    role
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
            usernameField: "email"
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email: username});
                if(!user){ return done(null, false) }
                if(!isValidPassword(user, password)) { return done(null, false) }
                return done(null, user);
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
                if (userExists) { return done(null, false) }
                

                const nombre = profile.displayName.split(" ");
                const first_name = nombre[0];
                const last_name = nombre.slice(1).join(" ");


                const newUser = {
                    first_name,
                    last_name,
                    email: profile.username,
                    age: 0,
                    password: createHash(profile.id),
                    role: "user" 
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
