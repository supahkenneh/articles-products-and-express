const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const articlesDB = require('../db/dbarticles');
const validation = require(`../middleware/validateArticles`);

let locals = {
  showArticles: true,
  articles: articlesDB.all(),
  deleteError: false,
  message: null,
  showProducts: false,
}

/***** METHOD STUFF *****/
router.get(`/`, (req, res) => {
  resetLocals(articlesDB.all());
  res.render('index', locals);
});

router.get(`/new`, (req, res) => {
  resetLocals(articlesDB.all());
  res.render('new', locals);
});

router.get(`/:urlTitle`, validation.validateArticleGetId, (req, res) => {
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  res.render('article', {
    showArticles: true,
    article: renderArticle,
  })
});

router.get(`/:urlTitle/edit`, validation.validateArticleGetEdit, (req, res) => {
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  res.render('edit', {
    showArticles: true,
    article: renderArticle,
  });
});

//post items
router.post(`/`, validation.validateArticlePost, (req, res) => {
  articlesDB.add(req.body);
  res.render('index', locals);
});

//put items
router.put(`/:urlTitle`, validation.validateArticlePut, (req, res) => {
  res.redirect(303, `/articles/${articleToEdit.urlTitle}`);
});

//delete items
router.delete(`/:urlTitle`, validation.validateArticleDelete, (req, res) => {
  res.render('index', {
    showArticles: true,
    message: `Article successfully deleted`,
    articles: articlesDB.all(),
  });
});

module.exports = router;

/****** HELPER STUFF******/

function resetLocals(list) {
  return {
    showArticles: true,
    list: list ? list : [],
    deleteError: false,
    message: null,
    showProducts: false,
  }
}