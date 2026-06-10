import express from "express";
import passport from "../lib/passport.js";
import {
  logout, login, signUp, updateprofile,
  sendResetOtp, resetPassword
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import generateToken from "../lib/utils.js";

const router = express.Router();

// existing routes
router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateprofile);
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

// ── Google OAuth ──
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/auth?error=google_failed`, session: false }),
  (req, res) => {
    // generate JWT cookie same as normal login
    generateToken(req.user._id, res);
    // redirect to frontend home
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);

export default router;