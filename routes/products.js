const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  res.render('home', {
    showProducts: true,
    products: productDB.all(),
  })
  // res.send(`Product Page`);
});

//post items
router.post(`/`, (req, res) => {
  if (!req.body.name) {
    res.status(404).send('Product has no name!');
    
  } else if (isNaN(parseInt(req.body.price))) {
    res.status(404).send('Please input a number for price');

  } else if (req.body.inventory < 1) {
    res.status(404).send('Please input an inventory value higher than 1');

  } else {
    let newProduct = {};
    newProduct.id = generateId();
    newProduct.name = req.body.name;
    newProduct.price = Number(req.body.price);
    newProduct.inventory = Number(req.body.inventory);

    productDB.add(newProduct);
    console.log(productDB.all());
    res.status(200).send('Product successfully added!');
  }
});


module.exports = router;

/****** HELPER STUFF******/
function generateId() {
  let randomId = Math.floor(Math.random() * 1000);
  return randomId;
}