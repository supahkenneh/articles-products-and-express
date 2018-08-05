const express = require('express');
const router = express.Router();
const db = require('../db/knex');
const articles = require('../helpers/helpers')
const validations = require('../middleware/validations');

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
      })
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showArticles: true
  })
});

router.get('/:urltitle', (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  articles.selectAllArticles(urltitle)
    .then(result => {
      res.render('article', {
        article: result[0]
      })
    })
    .catch(err => console.log(err));
});

router.get('/:urltitle/edit', (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  articles.selectAllArticles(urltitle)
    .then(result => {
      if (result.length < 1) {
        res.render('new', {
          showArticles: true,
          message: `Article doesn't exist, do you wish to enter a new article?`
        })
      }
      return result;
    })
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
  articles.addArticle(data)
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

router.put('/:urltitle', (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  const data = req.body;
  articles.selectAllArticles(urltitle)
    .then(result => {
      if (result.length < 1) {
        return res.redirect(`/articles/${urltitle}/edit`);
      }
      return result;
    })
    .then(result => {
      return articles.updateArticle(urltitle, data);
    })
    .then(result => {
      res.redirect(`/articles/${encodeURI(data.title)}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:urltitle', (req, res) => {
  const urltitle = encodeURI(req.params.urltitle);
  articles.selectAllArticles(urltitle)
    .then(result => {
      if (result.length < 1) {
        res.redirect(`/articles/${urltitle}`)
      }
      return result;
    })
    .then(result => {
      return articles.deleteArticle(urltitle);
    })
    .then(result => {
      res.redirect('/articles');
    })
    .catch(err => console.log(err));
});

module.exports = router;
