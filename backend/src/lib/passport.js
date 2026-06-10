import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();
   
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // check if user already exists by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) return done(null, user);

        // check if email already registered manually
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // link google to existing account
          user.googleId = profile.id;
          if (!user.profilePic && profile.photos[0]?.value) {
            user.profilePic = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        // brand new user via Google
        const newUser = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0]?.value || "",
          password: "", // no password for Google users
        });

        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;