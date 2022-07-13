const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const app = express();

// METHOD OVERRRIDE package
// override with the X-HTTP-Method-Override header in the request. We can now use the 'put' & 'delete' method in html forms.
app.use(methodOverride('_method'));

// REQUIRES
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const logs = require('./middlewares/logs');

// CONFIGS
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('port', process.env.PORT || 3001);
app.set('views', path.resolve(__dirname, './views'));

// Para capturar datos de los forms (POST && PUT)
app.use(express.urlencoded({extended: false}));  // is a inbuilt method in express to recognize the incoming Request Object as strings or arrays.
app.use(express.json());  // is a inbuilt METHOD in express to recognize the incoming Request Object as a JSON Object.

// Express-Session. (Para guardar datos del usuario actual).
app.use(session({secret: "Hashhhh"}));

// Logs de ingreso a rutas.
app.use(logs);


// SET TEMPLATE ENGINE (EJS)
app.set('view engine', 'ejs');

// ADDRESSING
app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);

// 404 NOT FOUND
app.use((req, res, next) => {
    //res.status(404).render('not-found');
    res.status(404).render("not-found");
})




// LISTEN
app.listen(app.get('port'), () => {
    console.log(`Server running successfully on port ${app.get('port')}`);
});
