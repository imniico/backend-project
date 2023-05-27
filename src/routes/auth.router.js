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

