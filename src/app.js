const express = require('express');
const path = require('path');
const app = express();

// ROUTES
const mainRoutes = require('./routes/mainRoutes');
const allProdsRoutes = require('./routes/allProductsRoutes');
const prodDetailsRoutes = require('./routes/productDetails');
const shoppingCartRoutes = require('./routes/shoppingCartRoutes');
const loginRoutes = require('./routes/loginRoutes');
const registerRoutes = require('./routes/registerRoutes');
const recoverRoutes = require('./routes/recoverRoutes');

// STATIC PATHS
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
app.set('views', path.resolve(__dirname, './views'));

// SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');


// ADDRESSING
app.use('/', mainRoutes);
app.use('/all-products', allProdsRoutes);
app.use('/product-details', prodDetailsRoutes);
app.use('/shopping-cart', shoppingCartRoutes);
app.use('/login-form', loginRoutes);
app.use('/register-form', registerRoutes);
app.use('/recover', recoverRoutes);


// LISTEN
app.listen(app.get('port'), () => {
    console.log(`Server running successfully on port ${app.get('port')}`);
});
