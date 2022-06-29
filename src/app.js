const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// METHOD OVERRRIDE
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'))

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
