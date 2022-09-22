
const path = require('path');
const fs = require('fs');

const productController = {

    getProducts: (req, res) => {

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        res.render('products', {productos})
},

    getProductDetail: (req, res) => {
      
        const id = req.params.id;

        const productosJSON = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf8');

        const productos = JSON.parse(productosJSON);

        const productoPedido = productos.find(productoActual => productoActual.id == id);
           
        res.redirect('products/detail');
    },

    add: (req, res) => {
    res.render('product_add')
},

    edit: (req, res) => {
    res.render('product_edit')
},

    addProduct: function (req, res) {
        console.log(req.file)

       // productosJson();

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

        res.redirect('/products/detail/' + nuevoProducto.id);
    },

    editProduct: function (req, res) {

         console.log(req.file)
        // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
  

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
            
        };


    })

        const productosActualizadosJSON = JSON.stringify(productos);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosJSON, 'utf8');

        res.redirect('/products/detail/' + nuevoProducto.id);
    },



    deleteProduct: (req, res) => {
            const { id } = req.params;

            const productosJson = fs.readFileSync(path.join(__dirname, '../data/productData.json'), 'utf-8');
            const productos = JSON.parse(productosJson);

            const productIndex = productos.findIndex((product) => product.id == id);
            productos.splice(productIndex, 1);

            const productosActualizadosDelJSON = JSON.stringify(productos);

            // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
            fs.writeFileSync(path.join(__dirname, '../data/productData.json'), productosActualizadosDelJSON, 'utf8');
    
            res.redirect("/products");
    }
    
}


module.exports = productController