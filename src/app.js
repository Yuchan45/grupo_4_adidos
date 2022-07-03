const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const app = express();

// METHOD OVERRRIDE package
// override with the X-HTTP-Method-Override header in the request. We can now use the 'put' & 'delete' method in html forms.
//app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));

// ROUTES
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// STATIC PATHS
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
app.set('views', path.resolve(__dirname, './views'));
// Para capturar datos de los forms
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');

// ADDRESSING
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);

// 404 NOT FOUND
app.use((req, res, next) => {
    //res.status(404).render('not-found');
    res.status(404).send("Error 404, pagina no encontrada");
})




// LISTEN
app.listen(app.get('port'), () => {
    console.log(`Server running successfully on port ${app.get('port')}`);
});
