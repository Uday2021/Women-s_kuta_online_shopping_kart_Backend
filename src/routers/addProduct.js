const express = require('express')
const router = express.Router();
const product = require("../model/product");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
       cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};

const upload = multer({storage: storage, 
    limits:{
       fileSize: 1024 * 1024 * 5
     },
     fileFilter: fileFilter
});


router.post('/', upload.single('Image') ,async(req,res,next) =>{
    console.log(req.file);
    try{
        const addProduct = new product({
            Name: req.body.Name,
            Price: req.body.Price,
            Selling_price: req.body.Selling_price,
            Discount: req.body.Discount,
            Description: req.body.Description,
            Image: "http://localhost:4000/" + req.file.path,
            Size: req.body.Size,
        });
         const storeProduct = await addProduct.save();
         res.status(201).send(addProduct);

    }catch(e){
        res.status(400).send(e.name);
    }
});


router.get('/', async(req,res) =>{
    try{
      const getData = await product.find();

      res.status(200).send(getData);
    }catch(e){
       res.status(400).send(e.name);
    }
})

module.exports = router;