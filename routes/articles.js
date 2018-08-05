const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const helpers = require('../helpers/helpers')
const validations = require('../middleware/validations');
const checkHead = require('../middleware/articleHeaderCheck');

router.use(checkHead.checkHeader);

let statusMessage = {
  message: null
};

/************* GET PAGES *************/
router.get('/', (req, res) => {
  db.select().from('articles')
    .then(result => {
      res.render('index', {
        showArticles: true,
        articles: result,
        message: statusMessage.message
      })
      statusMessage.message = null;
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showArticles: true,
    message: statusMessage.message
  })
  statusMessage.message = null;
});

router.get('/:urltitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  helpers.selectAllArticles(urltitle)
    .then(result => {
      res.render('article', {
        article: result[0]
      })
    })
    .catch(err => console.log(err));
});

router.get('/:urltitle/edit', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  helpers.selectAllArticles(urltitle)
    .then(result => {
      return res.render('edit', {
        showArticles: true,
        article: result[0]
      })
    })
    .catch(err => console.log(err));
});

/************* METHODS *************/
router.post('/', validations.validateArticleInput, (req, res) => {
  const data = req.body;
  helpers.addArticle(data)
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

router.put('/:urltitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  const data = req.body;
  return helpers.updateArticle(urltitle, data)
    .then(result => {
      res.redirect(`/articles/${encodeURI(data.title)}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:urltitle', validations.validateArticle, (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  return helpers.deleteArticle(urltitle)
    .then(result => {
      statusMessage.message = `Article successfully deleted!`
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

module.exports = router;
