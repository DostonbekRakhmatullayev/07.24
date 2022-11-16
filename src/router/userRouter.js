import { Router } from "express";
import { LOGIN } from "../controllers/userlogin.js";

const router = Router()

// Login Router
router.post("/login", LOGIN)

export default router