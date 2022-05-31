const express = require('express');
const path = require('path');
const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// GETS
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

app.get('/all-products', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/all-products.html'));
});

app.get('/login-form', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login-form.html'));
});

app.get('/product-details', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/product-details.html'));
});

app.get('/register-form', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register-form.html'));
});

app.get('/shopping-cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/shopping-cart.html'));
});


// LISTEN
app.listen(3000, () => {
    console.log("Sevidor corriendo en puerto 3000");
});