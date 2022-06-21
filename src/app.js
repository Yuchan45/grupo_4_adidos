const express = require('express');
const path = require('path');
const app = express();

// ROUTES
const mainRoutes = require('');

//MIDDLEWARE
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('puerto', process.env.PORT || 3001);

// SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');


// GETS
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

// app.get('/all-products', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/all-products.html'));
// });

// app.get('/login-form', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/login-form.html'));
// });

// app.get('/product-details', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/product-details.html'));
// });

// app.get('/register-form', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/register-form.html'));
// });

// app.get('/shopping-cart', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/shopping-cart.html'));
// });


// LISTEN
app.listen(app.get('puerto'), () => {
    console.log(`Servidor corriendo de manera satisfactoria en el puerto ${app.get('puerto')}`);
});
