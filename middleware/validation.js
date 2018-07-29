//validate product information
const productDB = require('../db/dbproducts');

let locals = {
  showProducts: true,
  products: productDB.all(),
  deleteError: false,
  message: null,
  showArticles: false,
}

function validatePost(req, res, next) {
  resetLocals(productDB.all());
  let success = false;
  if (req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || isNaN(parseInt(req.body.inventory)) || req.body.inventory < 1 ){
    locals.message = 'Input error! Please enter a name, price, and inventory';
  } else {
    success = true;
  }
  if (success === false) {
    res.render('new', locals);
  } else {
    next();
  }
}

function validatePut(req, res, next) {
  resetLocals(productDB.all());
  let itemToEdit = productDB.findItem(req.params.id);
  if(!itemToEdit) {
    res.redirect(`/products/${req.params.id}/edit`);
  } else {
    if(req.body.name.length < 1 || isNaN(parseInt(req.body.price)) || isNaN(parseInt(req.body.inventory)) || req.body.inventory < 1) {
      locals.message = 'Input error! Please enter a name, price, and inventory';
      res.redirect(`/products/${req.params.id}/edit`);
    } else {
      productDB.editItem(req.body, itemToEdit);
      next();
    }
  }
}

function validateDelete(req, res, next) {
  
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

module.exports = {
  validatePost,
  validatePut,
  validateDelete,
}
