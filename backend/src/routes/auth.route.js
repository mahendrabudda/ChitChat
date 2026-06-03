import express from "express";
import { logout , login, signUp } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";
import { updateprofile } from "../controllers/auth.controller.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js";

const router = express.Router();
router.use(arcjetProtection);

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute ,updateprofile);
router.get("/check",protectRoute,(req,res) =>res.status(200).json(req.user));

export default router;


