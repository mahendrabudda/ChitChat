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
        console.log("Google profile received:", profile.id, profile.emails[0].value);

        let user = await User.findOne({ googleId: profile.id });
        console.log("User by googleId:", user?._id);

        if (user) return done(null, user);

        user = await User.findOne({ email: profile.emails[0].value });
        console.log("User by email:", user?._id);

        if (user) {
          user.googleId = profile.id;
          if (!user.profilePic && profile.photos[0]?.value) {
            user.profilePic = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        console.log("Creating new user...");
        const newUser = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0]?.value || "",
          password: "",
        });
        console.log("New user created:", newUser._id);

        return done(null, newUser);
      } catch (error) {
        console.log("Passport strategy error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;