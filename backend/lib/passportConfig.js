// const passport = require("passport");
import passport from "passport";
// const Strategy = require("passport-local").Strategy;

import { Strategy } from "passport-local";

// const passportJWT = require("passport-jwt");
import passportJWT from 'passport-jwt';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from "passport-jwt";
// const JWTStrategy = passportJWT.Strategy;
// const ExtractJWT = passportJWT.ExtractJwt;

// const User = require("../db/User");
import User from '../db/User.js';
import authKeys from './authKeys.js';
// const authKeys = require("./authKeys");


const filterJson = (obj, unwantedKeys) => {
  const filteredObj = {};
  Object.keys(obj).forEach((key) => {
    if (unwantedKeys.indexOf(key) === -1) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
};




passport.use(
  new Strategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    (req, email, password, done, res) => {
      // console.log(email, password);
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "User does not exist",
          });
        }

      // console.log("what is user ??", user);
      
        user.login(password)
          .then(() => {
            // let userSecure = {};
            // const unwantedKeys = ["password", "__v"];
            // Object.keys(user["_doc"]).forEach((key) => {
            //   if (unwantedKeys.indexOf(key) === -1) {
            //     userSecure[key] = user[key];
            //   }
            // });
            user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
            return done(null, user);
          })
          .catch((err) => {
            return done(err, false, {
              message: "Password is incorrect.",
            });
          });
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authKeys.jwtSecretKey,
    },
    (jwt_payload, done) => {
      User.findById(jwt_payload._id)
        .then((user) => {
          console.log(Object.keys(jwt_payload));
          if (!user) {
            return done(null, false, {
              message: "JWT Token does not exist",
            });
          }
          user["_doc"] = filterJson(user["_doc"], ["password", "__v"]);
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false, {
            message: "Incorrect Token",
          });
        });
    }
  )
); 

// module.exports = passport;
export default passport ;
// export default passportConfig;
