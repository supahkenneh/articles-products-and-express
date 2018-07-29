const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productDB = require('../db/dbproducts');
const validation = require('../middleware/validation');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let locals = {
  showProducts: true,
  products: productDB.all(),
  deleteError: false,
  message: null,
  showArticles: false,
}

/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  resetLocals(productDB.all());
  res.render('index', locals)
});

router.get(`/new`, (req, res) => {
  resetLocals(productDB.all());
  res.render('new', locals);
});

router.get(`/:id`, (req, res) => {
  resetLocals(productDB.all());
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item doesn't exist, please enter a new item`;
    res.render('new', locals)
  } else {
    res.render('product', {
      showProducts: true,
      product: renderItem,
    })
  }
});

router.get(`/:id/edit`, (req, res) => {
  resetLocals(productDB.all());
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item can't be edit because it doesn't exist`
    res.render('index', locals);
  } else {
    res.render('edit', {
      showProducts: true,
      product: renderItem,
    });
  };
});


//post items
router.post(`/`, validation.validatePost, (req, res) => {
    productDB.add(req.body);
    res.redirect(`/products`);
});

//put items
router.put(`/:id`, validation.validatePut, (req, res) => {
  res.redirect(`/products/${req.params.id}`);
});


//delete items
router.delete(`/:id`, validation.validateDelete, (req, res) => {
  res.render('index', {
    showProducts: true,
    message: 'Item successfully deleted!',
    products: productDB.all(),
  });
});


module.exports = router;

/****** HELPER STUFF******/

function resetLocals(list) {
  return {
    showArticles: false,
    list: list ? list : [],
    deleteError: false,
    message: null,
    showProducts: true,
  }
}