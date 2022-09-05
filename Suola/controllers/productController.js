const productController = {
    
    home: (req, res) => {
    res.render('home')
},

    detail: (req, res) => {
    res.render('product_detail')
},
}

module.exports = productController

