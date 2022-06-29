const express = require('express');
const path = require('path');
const app = express();

// ROUTES
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


// STATIC PATHS
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
app.set('views', path.resolve(__dirname, './views'));
app.use(express.static(__dirname + './public')); 

// SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');


// ADDRESSING
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);



// LISTEN
app.listen(app.get('port'), () => {
    console.log(`Server running successfully on port ${app.get('port')}`);
});
