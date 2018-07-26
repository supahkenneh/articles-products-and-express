const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require(`./routes/products`);
const exphbs = require('express-handlebars');

const PORT = process.env.port || 3005;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get(`/`, (req, res) => {
  // const locals = {
  //   greeting: 'Aloha',
  // }
  // res.render('main', locals);
  res.send('WORK IN PROGRESS');
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
  res.send('HELLO WORLD?');
});

app.use((err, res, req, next) => {
  console.log(err);
  res.status(500).send(`Oops! Something went wrong`);
})

app.listen(PORT, () => {
  console.log('Server initiated!')
});;