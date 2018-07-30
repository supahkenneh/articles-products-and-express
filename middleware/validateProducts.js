//validate product information
const productDB = require('../db/dbproducts');

let locals = {
  showProducts: true,
  products: productDB.all(),
  deleteError: false,
  message: null,
  showArticles: false,
}

/********** PRODUCT VALIDATIONS **********/
function validatePost(req, res, next) {
  resetLocals(productDB.all());
  if (req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || isNaN(parseInt(req.body.inventory)) || req.body.inventory < 1) {
    locals.message = 'Input error! Please enter a name, price, and inventory';
    res.render('new', locals);
  } else {
    next();
  }
}

function validatePut(req, res, next) {
  resetLocals(productDB.all());
  let itemToEdit = productDB.findItem(req.params.id);
  if (!itemToEdit) {
    res.redirect(`/products/${req.params.id}/edit`);
  } else {
    if (req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || isNaN(parseInt(req.body.inventory)) || req.body.inventory < 1) {
      locals.message = 'Unable to edit item due to input errors';
      res.render('index', locals);
    } else {
      productDB.editItem(req.body, itemToEdit);
      next();
    }
  }
}

function validateDelete(req, res, next) {
  resetLocals(productDB.all());
  let itemToDelete = productDB.findItem(req.params.id);
  if (!itemToDelete) {
    locals.message = `Item can't be deleted because it doesn't exist`;
    res.render('index', locals);
  } else {
    productDB.remove(itemToDelete);
    next();
  }
};

function validateGetEdit(req, res, next) {
  resetLocals(productDB.all());
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item can't be edited because it doesn't exist`
    res.render(`index`, locals);
  } else {
    next();
  }
}

function validateGetById(req, res, next) {
  resetLocals(productDB.all());
  let renderItem = productDB.findItem(req.params.id);
  if (!renderItem) {
    locals.message = `Item doesn't exist, please enter a new item`;
    res.render(`new`, locals)
  } else {
    next();
  }
}

module.exports = {
  validatePost,
  validatePut,
  validateDelete,
  validateGetEdit,
  validateGetById,
}

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

