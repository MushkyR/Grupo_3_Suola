const express = require("express");
const path = require("path")
const userRoutes = require('./routes/userRoutes')
const cartRoutes = require('./routes/cartRoutes')
const productRoutes = require('./routes/productRoutes')
const homeRoutes = require('./routes/homeRoutes')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static("public"))



app.set("views", [
    path.join(__dirname, './views'),
    path.join(__dirname, './views/cart' ), 
    path.join(__dirname, './views/product'),
    path.join(__dirname, './views/user')
]) 


app.use('/cart', cartRoutes)
app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/', homeRoutes)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(3500, () => {
    console.log ("Servidor corriendo en el puerto 3500")
});
