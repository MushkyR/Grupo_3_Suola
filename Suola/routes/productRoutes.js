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

//listado de productos
router.get('/', productController.getProducts);

//formulario para agregar un producto
router.get('/add', productController.add);

//detalle de un producto en particuar

router.get('/:id', productController.getProductDetail);


//acción de agregar producto
router.post('/add', upload.single('productPhoto'), productController.addProduct);

//formulario de edición de producto
router.get('/edit/:id', productController.edit)

//accion de edicion de producto
router.put('/edit/:id', upload.single('productPhoto'), productController.editProduct);

//accion de eliminación de producto
router.delete('/edit/:id', productController.deleteProduct)

module.exports =router;
