import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const callbackURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/auth/google/callback"
    : `${process.env.CLIENT_URL}/api/auth/google/callback`;

console.log("Google Callback URL:", callbackURL);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // your existing code
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;