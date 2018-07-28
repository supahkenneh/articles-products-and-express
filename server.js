const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require(`./routes/products`);
const exphbs = require('express-handlebars');
const PORT = process.env.port || 3005;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/***** METHOD OVERRIDE *****/
app.use(methodOverride((req, res) => {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//static

app.get(`/`, (req, res) => {
  res.render('index', indexPage);
});

/****** HANDLEBAR STUFF******/
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));

app.set('view engine', '.hbs');

/****** ROUTE STUFF******/
app.use(`/articles`, articles);
app.use(`/products`, products)

/****** Catch ALL, ERROR, and LISTEN******/
app.get('*', (req, res) => {
  res.send('HELLO WORLD?'); //404
});

app.use((err, res, req, next) => {
  console.log(err);
  res.status(500).send(`Oops! Something went wrong`);
})

app.listen(PORT, () => {
  console.log('Server initiated!')
});;