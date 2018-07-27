const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

let urlEncoder = bodyParser.urlencoded({ extended: false })

let locals = {
  showProducts: false,
  products: productDB.all(),
  deleteError: false,
  message: null,
}


/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  locals.showProducts = true;
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
  res.render('edit', locals);
});


//post items
router.post(`/`, urlEncoder, (req, res) => {
  console.log(req.body)
  resetLocals();
  if (!req.body.name || isNaN(parseInt(req.body.price)) || req.body.inventory < 1) {
    locals.message = "Input error! Please enter a name, price, and inventory";
    res.redirect(303, `/products/new`);
  } else {
    productDB.add(req.body);
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
    locals.message = 'Item not found, please edit information below...'
    res.redirect(303, `/products/${req.params.id}`)
  }
});

//delete items
router.delete(`/:id`, (req, res) => {
  let id = req.params.id;
  productDB.remove(id);
  if (productDB.remove(id) === true) {
    locals.message = 'Item successfully deleted'
    res.render('index', locals);
  } 
    res.status(404).send('Page Not Found');
});


module.exports = router;

/****** HELPER STUFF******/

function resetLocals() {
  locals = {
    showProducts: false,
    products: productDB.all(),
    deleteError: false,
    message: null,
  }
}