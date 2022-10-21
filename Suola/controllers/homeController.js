const homeController = {
    
    home: (req, res) => {
    res.render('home', {
        user: req.session.userLogged
    })
},

}

module.exports = homeController

