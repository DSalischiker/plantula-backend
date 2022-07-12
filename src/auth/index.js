require("dotenv").config();
const passport = require("passport");
const InventoryModel = require("../models/inventory");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        console.log("username", username);
        const user = await UserModel.create({ email: username, password });
        const userDto = {
          email: user.email,
          id: user._id,
        };
        const inventory = await InventoryModel.create({ user: user._id });

        return done(null, userDto);
      } catch (error) {
        console.log({ error });
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });

        if (!user) {
          return done(null, false, { message: "User not found", code: 404 });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password", code: 401 });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.AUTH_SECRET,
      ignoreExpiration: true,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        console.log(token);
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);