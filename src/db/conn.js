const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://udaydb:Uday@1234@cluster0.egsik.mongodb.net/starRating?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>{
    console.log("connection successfful");

}).catch((e) =>{
     console.log("no connection");
})