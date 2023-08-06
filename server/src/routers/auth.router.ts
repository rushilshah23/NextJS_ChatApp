import { Router } from "express";
import { authenticate, localLogin, localRegister, logout } from "../controllers/auth.controller";

const router = Router()

router.post("/login",localLogin)
router.post("/register",localRegister)
router.post("/logout",logout);
router.post("/authenticate",authenticate)
// router.get("/authTokens",)





export {router as AuthRoutes};