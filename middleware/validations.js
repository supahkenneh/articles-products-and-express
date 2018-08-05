const helpers = require('../helpers/helpers');

let statusMessage = {
  message: null
}

function validateItemInput(req, res, next) {
  const data = req.body;
  if (data.name.length < 1 || isNaN(parseInt(data.price)) || isNaN(parseInt(data.inventory))) {
    statusMessage.message = 'Error: Please enter valid name, price, and inventory';
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
  helpers.selectAllProducts(id)
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

function validateArticleInput (req, res, next) {
  const data = req.body;
  helpers.findDupes(data)
  .then(result => {
    if (result.length > 0) {
      statusMessage.message = `Error: Article of that name already exists!`;
      return res.render('new', {
        showArticles: true,
        message: statusMessage.message,
        content: data
      })
    } else if (data.author.length < 1) {
      statusMessage.message = `Error: Please enter an author`;
      return res.render('new', {
        showArticles: true,
        message: statusMessage.message,
        content: data
      })
    } else {
      next();
    }
  })
};

module.exports = {
  validateItemInput,
  validateProduct,
  validateArticleInput
};