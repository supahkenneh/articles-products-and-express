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
  let renderItem;
  productDB.all().map(elem => {
    if (elem.id === Number(req.params.id)) {
      renderItem = elem;
    }
    return renderItem
  })
  res.render('edit', {
    product: renderItem,
  });
});


//post items
router.post(`/`, urlEncoder, (req, res) => {
  console.log(req.body)
  resetLocals();
  if (req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || req.body.inventory < 1) {
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
  //render after put
  if (locals.itemFound === false) {
    res.redirect(303, `/products/${req.params.id}/edit`);
  } else {
    locals.showProducts = true;
    locals.message = 'Item not found, please edit information below...'
    res.redirect(303, `/products/${req.params.id}`)
    resetLocals();
  }
});

//delete items
router.delete(`/:id`, (req, res) => {
  let id = req.params.id;
  productDB.all().map(elem => {
    if (Number(id) === elem.id) {
      productDB.remove(elem);
      locals.deleted = true;
    }
  })
  if (locals.deleted === false) {
    res.render(`new`, {
      message: `Item doesn't exist, please enter a new item`,
    });
    resetLocals();
  } else {
    locals.showProducts = true
    locals.message = 'Item successfully deleted'
    res.render('index', locals);
  }
  resetLocals();
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