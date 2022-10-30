const express = require("express");
const path = require("path")
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
const homeRoutes = require('./routes/homeRoutes')
const methodOverride = require('method-override');
const session = require("express-session");
const cookies = require("cookie-parser");
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const app = express();

app.set('view engine', 'ejs')

app.use(express.static("public"));
app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));


app.use(session({
    secret: "frase secreta",
    resave: false,
    saveUninitialized: false,
}));

app.use(userLoggedMiddleware);


app.use('/cart', cartRoutes)
app.use('/products', productRoutes)
app.use('/user', userRoutes)
app.use('/', homeRoutes)

app.use((req, res, next) => {
    res.status(404).render('404')
  })



app.set("views", [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/cart' ), 
    path.join(__dirname, './views/product'),
    path.join(__dirname, './views/user')
]) 


app.listen(3500, () => {
    console.log ("Servidor corriendo en el puerto 3500")
});

