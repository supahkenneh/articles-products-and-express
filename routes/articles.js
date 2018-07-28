const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const articlesDB = require('../db/dbarticles');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

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

router.get(`/:urlTitle`, (req, res) => {
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  console.log(renderArticle);
  if (!renderArticle) {
    locals.message = `Article doesn't exist, please enter a new article`;
    res.render('new', locals);
  } else {
    res.render('article', {
      showArticles: true,
      article: renderArticle,
    })
  }
});

router.get(`/:urlTitle/edit`, (req, res) => {
  resetLocals(articlesDB.all());
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  if(!renderArticle) {
    locals.message = `Article can't be edited because it doesn't exist`
    res.render('index', locals);
  } else {
    res.render('edit', {
      showArticles: true,
      article: renderArticle,
    })
  }
});

//post items
router.post(`/`, (req, res) => {
  resetLocals(articlesDB.all());
  locals.showArticles = true;
  if (req.body.title < 1 || req.body.author < 1 || req.body.content < 1) {
    locals.message = "Input error! Please enter a name, author, and body";
    res.render('new', locals);
  } else {
    articlesDB.add(req.body);
    res.render('index', locals);
  }
});

//put items
router.put(`/:urlTitle`, (req, res) => {
  resetLocals(articlesDB.all());
  locals.showArticles = true;
  let articleToEdit = articlesDB.findArticle(req.params.urlTitle);
  if (!articleToEdit) {
    res.redirect(303, `/articles/${req.params.urlTitle}/edit`)
  } else {
    articlesDB.editArticle(req.body, articleToEdit);
    res.redirect(303, `/articles/${articleToEdit.urlTitle}`);
  }
});

//delete items
router.delete(`/:urlTitle`, (req, res) => {
  resetLocals(articlesDB.all());
  locals.showArticles = true;
  let articleToDelete = articlesDB.findArticle(req.params.urlTitle);
  if(!articleToDelete) {
    locals.message = `Article can't be deleted because it doesn't exist`
    res.render('index', locals);
  } else {
    articlesDB.removeArticle(articleToDelete);
    locals.message = 'Article successfully deleted';
    res.render('index', locals);
  }
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