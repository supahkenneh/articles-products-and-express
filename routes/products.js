const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const products = require('../helpers/helpers');
const validations = require('../middleware/validations');

let statusMessage = {
  message: null
};

/************* GET PAGES *************/
router.get('/', (req, res) => {
  db.select().from('products')
    .then(result => {
      res.render('index', {
        showProducts: true,
        products: result,
        message: statusMessage.message
      })
      statusMessage.message = null;
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  console.log(statusMessage.message);
  res.render('new', {
    showProducts: true,
    message: statusMessage.message
  })
  statusMessage.message = null;
});

router.get('/:id', validations.validateProduct, (req, res) => {
  const id = req.params.id;
  products.selectAllProducts(id)
    .then(result => {
      res.render('product', {
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});

router.get('/:id/edit', validations.validateProduct,(req, res) => {
  const id = req.params.id;
  products.selectAllProducts(id)
    .then(result => {
      res.render('edit', {
        showProducts: true,
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});

/************* METHODS *************/
router.post('/', validations.validateItemInput, (req, res) => {
  const data = req.body;
  return products.addProduct(data)
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

router.put('/:id', validations.validateProduct, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  products.updateProduct(id, data)
    .then(result => {
      res.redirect(`/products/${id}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:id', validations.validateProduct, (req, res) => {
  const id = Number(req.params.id);
  products.deleteProduct(id)
    .then(result => {
      statusMessage.message = 'Item successfully deleted!';
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

module.exports = router;