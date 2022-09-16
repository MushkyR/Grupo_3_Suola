
const path = require('path');
const fs = require('fs');

const productController = {

    add: (req, res) => {
    res.render('product_add')
},

    edit: (req, res) => {
    res.render('product_edit')
},

    addProduct: function (req, res) {
        console.log(req.file)
        // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
        const productosJson = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8');
        const productos = JSON.parse(productosJson);
        // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
        const nuevoProducto = {
            id: Date.now(),
            categoria: req.body.categoria,
            nombreArticulo: req.body.nombreArticulo,
            numeroArticulo: req.body.numeroArticulo,
            descripcion: req.body.descripcion,
            precioArticulo: req.body.precioArticulo,
            talle: req.body.talle,
            colores: req.body.colores,
            img: './profilePhotos/' + req.file.filename
        };

        productos.push(nuevoProducto);

        const productosActualizadosJSON = JSON.stringify(productos);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosJSON, 'utf8');

        res.redirect('/product/detail/' + nuevoProducto.id);
    },

    editProduct: function (req, res) {

         
        console.log(req.file)
        // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
        const productosJson = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8');
        const productos = JSON.parse(productosJson);

        let idProducto = req.params.id;
        
        productos.forEach(function(product){
            if (product.id == idProducto)      {
     
        
        // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
        product = {
            id: Date.now(),
            categoria: req.body.categoria,
            nombreArticulo: req.body.nombreArticulo,
            numeroArticulo: req.body.numeroArticulo,
            descripcion: req.body.descripcion,
            precioArticulo: req.body.precioArticulo,
            talle: req.body.talle,
            colores: req.body.colores,
            img: './profilePhotos/' + req.file.filename
        };
        ;
     };
})


        const productosActualizadosJSON = JSON.stringify(productos);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosJSON, 'utf8');

        res.redirect('/product/detail/' + nuevoProducto.id);
    },

    // @GET /user/detail
        getProductDetail: function (req, res) {
        const id = req.params.id;

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        const productoPedido = productos.find(productoActual => productoActual.id == id);

        res.render('product_detail', {
            //nombre: productoPedido.nombre,
            //email: productoPedido.email,
            //img: productoPedido.img
        });
    }
}


module.exports = productController

