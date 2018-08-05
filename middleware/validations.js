const products = require('../helpers/helpers');
const db = require('../db/knex');

let statusMessage = {
  message: null
}

function validateItemInput(req, res, next) {
  const data = req.body;
  if (data.name.length < 1 || isNaN(parseInt(data.price)) || isNaN(parseInt(data.inventory))) {
    statusMessage.message = 'Input error! Please enter valid name, price, and inventory';
    return res.render('new', {
      showProducts: true,
      message: statusMessage.message
    })
  } else {
    next();
  }
};

function validateProduct (req, res, next ) {
  const id = Number(req.params.id);
  products.selectAllProducts(id)
  .then(result => {
    if (result.length < 1) {
      statusMessage.message = `Error: Item doesn't exist`;
      return res.render('new', {
        showProducts: true,
        message: statusMessage.message
      })
    } else {
      next();
    }
  })
};

module.exports = {
  validateItemInput,
  validateProduct
};