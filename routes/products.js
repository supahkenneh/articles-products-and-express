const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let locals = {
  showProducts: false,
  products: productDB.all(),
  inputError: false,
  itemFound: false,
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
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      res.render(`product`, {
        product: elem,
        showProducts: true,
      })
    }
  })
});

router.get(`/:id/edit`, (req, res) => {
  res.render('edit');
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
  resetLocals();
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      elem.name = req.body.name;
      locals.itemFound = true;
    }
  });
  if (locals.itemFound === false) {
    res.redirect(303, `/products/${req.params.id}/edit`);
  } else {
    locals.showProducts = true;
    res.redirect(303, `/products/${req.params.id}`)
  }
});

//delete items
router.delete(`/:id`, (req, res) => {
  resetLocals();
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      console.log(elem);
      productDB.remove(elem);
      console.log(productDB.all());
      locals.showProducts = true;
      locals.deleteError = true;
    }
  })
  if (locals.deleteError === false) {
    res.render(`new`, {
      deleteError: true,
    });
  } else {
    res.render('index', locals);
  }
});



module.exports = router;

/****** HELPER STUFF******/
function generateId() {
  let randomId = Math.floor(Math.random() * 10);
  return randomId;
};

function resetLocals() {
  locals = {
    showProducts: false,
    products: productDB.all(),
    inputError: false,
    itemFound: false,
    deleteError: false,
  }
}