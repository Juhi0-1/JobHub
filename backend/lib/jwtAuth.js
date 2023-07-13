// const passport = require("passport");
import passport from "passport";
// import jwt from 'jwt-simple';
import './passportConfig.js';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from "passport-jwt";

const jwtAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).json(info);
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
};

// module.exports = jwtAuth;
export default jwtAuth;
