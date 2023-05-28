import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

router.post("/signup", AuthController.signup, AuthController.redirectProfile)

router.post("/login", AuthController.login, AuthController.redirectProfile)

router.post("/logout", AuthController.logout)

router.get("/github", AuthController.githubSignup );

router.get("/github-callback", AuthController.githubSignupCB, AuthController.redirectProfile);

router.get("/githublogin", AuthController.githubLogin);

router.get("/github-callback-login", AuthController.githubLoginCB , AuthController.redirectProfile);

router.get("/current", AuthController.getCurrent )

export default router;


// ----

// import { AppRouter } from "./app.router.js";
// import AuthController from '../controllers/auth.controller.js';

// class AuthRouter extends AppRouter {
//     init() {
//         this.post("/signup", AuthController.signup, AuthController.redirectProfile)

//         this.post("/login", AuthController.login, AuthController.redirectProfile)

//         this.post("/logout", AuthController.logout)

//         this.get("/github", AuthController.githubSignup );

//         this.get("/github-callback", AuthController.githubSignupCB, AuthController.redirectProfile);

//         this.get("/githublogin", AuthController.githubLogin);

//         this.get("/github-callback-login", AuthController.githubLoginCB , AuthController.redirectProfile);

//         this.get("/current", AuthController.getCurrent )
//     }
// }

// export { AuthRouter }

