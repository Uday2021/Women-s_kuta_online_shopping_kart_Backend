const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
       type: String,
       default: "user"
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]

})

userSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id}, "mynameisudaysaraswatreallybromynameisthisis")
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        console.log(token);
        return token;
    }catch(error){
        console.log(error)
        res.send(error);
    }
}

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);

        this.confirmPassword = await bcrypt.hash(this.password, 10);
        // this.confirmPassword = undefined;
    }
})


const user = new mongoose.model("user", userSchema);
module.exports = user;
