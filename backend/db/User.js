// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// require("mongoose-type-email");

import mongoose from 'mongoose';
import bcrypt from "bcrypt";


const schema = new mongoose.Schema(
  {
    email: {
      // type: mongoose.SchemaTypes.Email,
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant"],
      required: true,
    },
  },
  { collation: { locale: "en" } }
);



// Password hashing
schema.pre("save", async function (next) {
  let user = this;

  // if the data is not modified
  if (!user.isModified("password")) {
    return next();
  }

  // const salt =  await bcrypt.genSalt();
  //   this.password =  await bcrypt.hashSync(user.password, salt);
  //   user.password = hash;
  //   next();


  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});








// Password verification upon login
schema.methods.login = function (password) {
  let user = this;

  return new Promise((resolve, reject) => {
    // bcrypt.compare(password, user.password, (err, result) => {
    //   console.log("password : ", password);
    //   console.log("user.password : ", user.password);
    //   if (err) {
    //     reject(err);
       
    //   }
    //   if (result) {
    //     console.log(result);
    //     resolve();
    //   } else {
    //     reject();
        
    //   }
    // });

    if(password === user.password) resolve();
    else{ reject(); }
  });
};

const User = mongoose.model('User', schema);

export default User;
// module.exports = mongoose.model("UserAuth", schema);
