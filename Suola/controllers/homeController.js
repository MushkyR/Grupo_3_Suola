const homeController = {
    
    home: (req, res) => {
         
            name: req.body.name,
         
       
    res.render('home', {
        user: req.session.userLogged
    })
},

}

module.exports = homeController

