const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require("./db/conn");

const port = process.env.PORT || 4000


app.use(express.json());
app.use(cors());
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({extended: true}));

app.use('/stars', require('./routers/stars'));
app.use('/register', require('./routers/register'));
app.use('/login', require('./routers/login'));
app.use('/product', require('./routers/addProduct'));

app.listen(port, () =>{
    console.log(`server is running at port no ${port}`);
})
