const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const locals = {
  showProducts: false,
  products: productDB.all(),
  inputError: false,
  itemNotFound: false,
  deleteError: false,
}


/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  res.render('index', locals)
});

router.get(`/new`, (req, res) => {
  res.render('new', locals);
});

router.get(`/:id`, (req, res) => {
  let id = req.params.id;
  locals.showProducts = true;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      res.render(`product`, {
        product: elem,
      })
    }
  })
});

router.get(`/:id/edit`, (req, res) => {
  res.render('edit', locals);
});


//post items
router.post(`/`, (req, res) => {
  if (!req.body.name) {
    locals.inputError = true;
    res.redirect(303, `/products/new`);

  } else if (isNaN(parseInt(req.body.price))) {
    locals.inputError = true;
    res.redirect(303, `/products/new`);

  } else if (req.body.inventory < 1) {
    locals.inputError = true;
    res.redirect(303, `/products/new`);

  } else {
    let newProduct = {};
    newProduct.id = generateId();
    newProduct.name = req.body.name;
    newProduct.price = Number(req.body.price);
    newProduct.inventory = Number(req.body.inventory);

    productDB.add(newProduct);
    console.log(productDB.all());
    locals.showProducts = true;
    res.render(`index`, locals);
  }
});

//put items
router.put(`/:id`, (req, res) => {
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      elem.name = req.body.name;
      locals.itemNotFound = true;
    }
  });
  if (locals.itemNotFound === false) {
    res.redirect(303, `/products/${req.params.id}/edit`);
  } else {
    res.redirect(303, `/products/${req.params.id}`)
  }
});

//delete items
router.delete(`/:id`, (req, res) => {
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      productDB.remove(elem);
      locals.showProducts = true;
    }
  })
  if (locals.deleteError === false) {
    res.render('index', locals);
  } else {
    res.redirect(303, `/products/new`);
  }
});



module.exports = router;

/****** HELPER STUFF******/
function generateId() {
  let randomId = Math.floor(Math.random() * 10);
  return randomId;
};