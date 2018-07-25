const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const articles = require('./routes/articles');
const products = require(`./routes/products`);

const PORT = process.env.port || 3005;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get(`/`, (req, res) => {
  res.send(`HELLO WORLD!`);
});

app.use(`/articles`, articles);
app.use(`/products`, products)

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