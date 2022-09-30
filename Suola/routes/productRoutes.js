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
router.get('/:id/edit', productController.edit)

//accion de edicion de producto
router.put('/:id/edit', upload.single('productPhoto'), productController.editProduct);

//formulario de edición de producto
router.delete('/delete/:id', productController.deleteProduct)

module.exports =router;

/*
1. /products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado
*/