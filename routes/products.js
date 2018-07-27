const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const productDB = require('../db/dbproducts');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const indexPage = {
  showProducts: true,
  products: productDB.all(),
}


/****** METHOD STUFF******/
router.get(`/`, (req, res) => {
  res.render('index', indexPage)
});

router.get(`/new`, (req, res) => {
  res.render('new');
});

router.get(`/:id`, (req, res) => {
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      res.render(`product`, {
        product: elem,
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
    res.redirect(303, `/products/new`);

  } else if (isNaN(parseInt(req.body.price))) {
    res.redirect(303, `/products/new`);

  } else if (req.body.inventory < 1) {
    res.redirect(303, `/products/new`);

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

//put items
router.put(`/:id`, (req, res) => {
  let putSuccessful = false;
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      elem.name = req.body.name;
      putSuccessful = true;
      res.redirect(303, `/products/${req.params.id}`)
    }
    if (putSuccessful === false) {
      res.redirect(303, `/products/${req.params.id}/edit`);
    }
  })
});
//if ID doesn't exist, server hangs, need to render home but will throw header error if array length is > 1

//delete items
router.delete(`/:id`, (req, res) => {
  let deleteSuccessful = false;
  let id = req.params.id;
  productDB.all().map(elem => {
    if (elem.id === Number(id)) {
      productDB.remove(elem);
      deleteSuccessful = true;
      res.render('index', indexPage);
    }
    // if (deleteSuccessful === false){
    //   res.render(303, `/products/${req.params.id}/edit`);
    // }
  })
});
//same problem as PUT



module.exports = router;

/****** HELPER STUFF******/
function generateId() {
  let randomId = Math.floor(Math.random() * 10);
  return randomId;
};