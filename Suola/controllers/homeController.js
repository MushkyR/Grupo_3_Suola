const homeController = {
    
    home: (req, res) => {
         
            name: req.body.name,
         
       
    res.render('home', {
        user: req.session.userLogged
    })
},

error:(req, res) => {
    res.render('404')
}

}

module.exports = homeController

