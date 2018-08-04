const products = require('../helpers/helpers');
const db = require('../db/knex');

let statusMessage = {
  message: null
}

function validateItem(req, res, next) {
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

function validateUpdate(req, res, next) {
  const id = req.params.id;
  products.selectAllProducts(id)
  .then(result => {
    if (result.length < 1) {
      statusMessage.message = `Unable to edit because item doesn't exist`
      return res.render(`new`, {
        showProducts: true,
        message: statusMessage.message
      });
    } else {
      next();
    }
  })
}

module.exports = {
  validateItem,
  validateUpdate
};