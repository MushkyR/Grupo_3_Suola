const productController = {

    detail: (req, res) => {
    res.render('product_detail')
},

    add: (req, res) => {
        res.render('product_add')
    },

    edit: (req, res) => {
        res.render('product_edit')
    },
}

module.exports = productController

