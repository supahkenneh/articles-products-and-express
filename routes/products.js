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
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showProducts: true
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  products.selectAllProducts(id)
    .then(result => {
      if (result.length < 1) {
        return res.render('new', {
          showProducts: true,
          message: `Item doesn't exist, do you wish to enter a new item?`
        })
      }
      return result;
    })
    .then(result => {
      res.render('product', {
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  products.selectAllProducts(id)
    .then(result => {
      if (result.length < 1) {
        return res.render('new', {
          showProducts: true,
          message: `Item doesn't exist, do you wish to enter a new item?`
        })
      }
      return result;
    })
    .then(result => {
      res.render('edit', {
        showProducts: true,
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});

/************* METHODS *************/
router.post('/', validations.validateItem, (req, res) => {
  const data = req.body;
  return products.addProduct(data)
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

router.put('/:id', validations.validateUpdate, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  products.updateProduct(id, data)
    .then(result => {
      res.redirect(`/products/${id}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  products.selectAllProducts(id)
    .then(result => {
      if (result.length < 1) {
        res.redirect(`/products/${id}`)
      }
      return result;
    })
    .then(result => {
      return products.deleteProduct(id);
    })
    .then(result => {
      statusMessage.message = 'Item successfully deleted!';
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

module.exports = router;

// /****** HELPER STUFF******/

function resetMessage() {
  return {
    message: null,
  }
}