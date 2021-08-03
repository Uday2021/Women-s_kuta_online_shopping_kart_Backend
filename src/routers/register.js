const express = require('express')
const router = express.Router();
const user = require("../model/user");


router.post('/', async(req,res) =>{
    try{
        const userRegister = new user({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
        const generatedToken = await userRegister.generateAuthToken();
        console.log("the token part:" + generatedToken);
         const registered = await userRegister.save();
         res.status(201).send(registered);

    }catch(e){
        res.status(400).send(e.name);
    }
});

module.exports = router;
