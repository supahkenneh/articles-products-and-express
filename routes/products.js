const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let locals = {
  showProducts: false,
  products: productDB.all(),
  deleteError: false,
  message: null,
  showArticles: false,
}


/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  resetLocals();
  locals.showProducts = true;
  res.render('index', locals)
});

router.get(`/new`, (req, res) => {
  resetLocals();
  locals.showProducts = true;
  res.render('new', locals);
});

router.get(`/:id`, (req, res) => {
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item doesn't exist, please enter a new item`;
    res.render('new', locals)
  } else {
    res.render('product', {
      product: renderItem,
    })
  }
});

router.get(`/:id/edit`, (req, res) => {
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item can't be edit because it doesn't exist`
    res.render('index', locals);
  } else {
    res.render('edit', {
      product: renderItem,
    });
  }
});


//post items
router.post(`/`, (req, res) => {
  resetLocals();
  locals.showProducts = true;
  if (req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || req.body.inventory < 1) {
    locals.message = "Input error! Please enter a name, price, and inventory";
    res.render(`new`, locals);
  } else {
    productDB.add(req.body);
    locals.showProducts = true;
    res.render(`index`, locals);
  }
});

//put items
router.put(`/:id`, (req, res) => {
  resetLocals();
  let itemToEdit = productDB.findItem(req.params.id);
  if (!itemToEdit) {
    res.redirect(303, `/products/${req.params.id}/edit`)
  } else {
    productDB.editItem(req.body, itemToEdit);
    res.redirect(303, `/products/${req.params.id}`);
  }
});


//delete items
router.delete(`/:id`, (req, res) => {
  resetLocals();
  let itemToDelete = productDB.findItem(req.params.id);
  if(!itemToDelete) {
    locals.message = `Item can't be deleted because it doesn't exist`
    res.render(`index`, locals);
  } else {
    productDB.remove(itemToDelete);
    locals.message = 'Item successfully deleted';
    res.render('index', locals);
  }
});


module.exports = router;

/****** HELPER STUFF******/

function resetLocals() {
  locals = {
    showProducts: true,
    products: productDB.all(),
    deleteError: false,
    message: null,
    showArticles: false,
  }
}