const express = require('express');
const router = express.Router();
const user = require("../model/user");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');





router.post("/",async(req,res) =>{
    try{
        // console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
    
        let users = await user.findOne({ email: email });
    
        console.log(users);
        const isMatch = await bcrypt.compare(password, users.password);
        // user = await Register.findOne({email:email}).select(["-password","-confirmpassword","-profile","-firstName","-lastName"]);
        // console.log(user);
        const generatedToken = jwt.sign({ sub: users._id }, "mynameisudaysaraswatreallybromynameisthisis");
        let sendUser = {
          name: users.name,
          email: users.email,
          password: users.password,
          token: generatedToken,
        };
        if (isMatch) {
          res.status(201).send(sendUser);
        } else {
          res.send("invalid user credentials");
        }
      } catch (e) {
        res.status(400).send("user is not exist");
      }
    });

module.exports = router;
