const helpers = require('../helpers/helpers');

let statusMessage = {
  message: null
}

function validateItemInput(req, res, next) {
  const data = req.body;
  checkInputs(data, res)
  next();
};

function validateProduct(req, res, next) {
  const id = Number(req.params.id);
  return helpers.selectAllProducts(id)
    .then(result => {
      if (result.length < 1) {
        statusMessage.message = `Error: Item doesn't exist, enter new item?`;
        return res.status(400).render('new', {
          showProducts: true,
          message: statusMessage.message
        })
      } else {
        next();
      }
    })
};

function validateArticleInput(req, res, next) {
  const data = req.body;
  helpers.findDupes(data)
    .then(result => {
      if (result.length > 0) {
        statusMessage.message = `Error: Article of that name already exists!`;
        return res.status(400).render('new', {
          showArticles: true,
          message: statusMessage.message,
          content: data
        })
      } else if (data.author.length < 1 || data.title.length < 1) {
        statusMessage.message = `Error: Please enter a title and author`;
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

function validateArticle(req, res, next) {
  const urltitle = encodeURI(req.params.urltitle);
  helpers.selectAllArticles(urltitle)
    .then(result => {
      if (result.length < 1) {
        statusMessage.message = `Error: Article doesn't exist, enter new article?`;
        return res.status(400).render(`new`, {
          showArticles: true,
          message: statusMessage.message
        });
      } else {
        next()
      }
    })
};

function checkInputs(inputs, res) {
  if (inputs.name.length < 1) {
    statusMessage.message = 'Error: Please enter a name for item';
    return res.render('new', {
      showProducts: true,
      message: statusMessage.message,
      product: inputs
    })
  } else if (isNaN(Number(inputs.price))) {
    statusMessage.message = `Error: Please enter a valid price`;
    return res.render('new', {
      showProducts: true,
      message: statusMessage.message,
      product: inputs
    })
  } else if (isNaN(Number(inputs.inventory)) || inputs.inventory < 1) {
    statusMessage.message = `Error: Please enter a number for inventory`;
    return res.render('new', {
      showProducts: true,
      message: statusMessage.message,
      product: inputs
    })
  }
};

module.exports = {
  validateItemInput,
  validateProduct,
  validateArticleInput,
  validateArticle
};