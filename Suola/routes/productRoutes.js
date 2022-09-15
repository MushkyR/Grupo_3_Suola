const express = require('express')

const router = express.Router()
const multer = require('multer');
const path = require('path')

const productController = require('../controllers/productController');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/profilePhotos'));
    },

    filename: function(req, file, cb){
        
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

router.get('/detail/:id', productController.getProductDetail);

router.get("/add", productController.add);

router.post('/add', upload.single('productPhoto'), productController.addProduct);

router.get("/edit", productController.edit)

router.put('/edit', upload.single('productPhoto'), productController.editProduct);



module.exports =router;