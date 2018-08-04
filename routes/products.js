const express = require('express');
const router = express.Router();
const db = require('../db/knex');

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
  db.select().from('products').where('id', id)
    .then(result => {
      res.render('product', {
        product: result[0]
      })
    })
    .catch(err => console.log(err));
});
//add conditional to check if id exists, render new if it doesn't

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  db.select().from('products').where('id', id)
    .then(result => {
      if (result.length < 1) {
        res.render('new', {
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
router.post('/', (req, res) => {
  const data = req.body;
  db('products').insert({ name: data.name, price: data.price, inventory: data.inventory })
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  db.select().from('products').where('id', id)
    .then(result => {
      if (result.length < 1) {
        res.redirect(`/products/${id}/edit`);
      }
      return result;
    })
    .then(result => {
      return db('products').where('id', id)
        .update({
          name: data.name,
          price: data.price,
          inventory: data.inventory
        })
    })
    .then(result => {
      res.redirect(`/products/${id}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  db.select().from('products').where('id', id)
    .then(result => {
      if (result.length < 1) {
        res.redirect(`/products/${id}`)
      }
      return result;
    })
    .then(result => {
      return db('products').where('id', id).del();
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