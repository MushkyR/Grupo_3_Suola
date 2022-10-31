const path = require('path');
const fs = require('fs');

const productController = {

    getProducts: (req, res) => {

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        res.render('products', { productos,
            user: req.session.userLogged })
    },


    getProductDetail: (req, res) => {

        const id = req.params.id;

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        const productoPedido = productos.find(productoActual => productoActual.id == id);

        console.log(productoPedido)

        res.render('product_detail', {
            nombreArticulo: productoPedido.nombreArticulo,
            id: productoPedido.id,
            categoria: productoPedido.categoria,
            numeroArticulo: productoPedido.numeroArticulo,
            descripcion: productoPedido.descripcion,
            precioArticulo: productoPedido.precioArticulo,
            talle: productoPedido.talle,
            colores: productoPedido.colores,
            img: productoPedido.img,
            user: req.session.userLogged,

        });
    },

    add: (req, res) => {

        res.render('product_add')
    },

    edit: (req, res) => {
        const id = req.params.id;

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        const productoPedido = productos.find(productoActual => productoActual.id == id);
        res.render('product_edit', {
            nombreArticulo: productoPedido.nombreArticulo,
            id: productoPedido.id,
            categoria: productoPedido.categoria,
            numeroArticulo: productoPedido.numeroArticulo,
            descripcion: productoPedido.descripcion,
            precioArticulo: productoPedido.precioArticulo,
            talle: productoPedido.talle,
            colores: productoPedido.colores,
            img: productoPedido.img
        })
    },

    addProduct: function (req, res) {
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
            img: '/profilePhotos/' + req.file.filename
        };

        productos.push(nuevoProducto);

        const productosActualizadosJSON = JSON.stringify(productos);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosJSON, 'utf8');

        res.redirect('/products/' + nuevoProducto.id);
    },

    editProduct: function (req, res) {
        
        // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
        const productosJson = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8');
        const productos = JSON.parse(productosJson);

        // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
        const id = req.params.id;
        const editProduct = {
        id: id,
        categoria: req.body.categoria,
        nombreArticulo: req.body.nombreArticulo,
        numeroArticulo: req.body.numeroArticulo,
        descripcion: req.body.descripcion,
        precioArticulo: req.body.precioArticulo,
        talle: req.body.talle,
        colores: req.body.colores,
        img: '/profilePhotos/' +  req.file.filename,
                };

        const listaActualizada = productos.map((productoActual) => {
            if (productoActual.id == editProduct.id) {
                productoActual = editProduct
            } return productoActual
        });


        const productosActualizadosJSON = JSON.stringify(listaActualizada);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosJSON, 'utf8');

        res.redirect('/products/'+ id);
    },


    deleteProduct: (req, res) => {
        const { id } = req.params;

        const productosJson = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8');
        let productos = JSON.parse(productosJson);

        productos = productos.filter(productoActual => productoActual.id != id);

        const productosActualizados = JSON.stringify(productos);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizados, 'utf8');

        res.redirect("/products");
    }

}


module.exports = productController