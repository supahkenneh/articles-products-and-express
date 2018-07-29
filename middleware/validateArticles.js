const articlesDB = require('../db/dbarticles');

let locals = {
  showArticles: true,
  articles: articlesDB.all(),
  deleteError: false,
  message: null,
  showProducts: false,
}

/********** ARTICLE VALIDATIONS **********/
function validateArticlePost(req, res, next) {
  resetLocals(articlesDB.all());
  if (req.body.title < 1 || req.body.author < 1 || req.body.body < 1) {
    locals.message = "Input error! Please enter a name, author, and body";
    res.render('new', locals);
  } else {
    next();
  }
};

function validateArticlePut(req, res, next) {
  resetLocals(articlesDB.all());
  let articleToEdit = articlesDB.findArticle(req.params.urlTitle);
  if (!articleToEdit) {
    res.redirect(`articles/${req.params.urlTitle}/edit`)
  } else {
    articlesDB.editArticle(req.body, articleToEdit);
    next();
  }
};

function validateArticleDelete(req, res, next) {
  resetLocals(articlesDB.all());
  let articleToDelete = articlesDB.findArticle(req.params.urlTitle);
  if (!articleToDelete) {
    locals.message = `Article can't be deleted because it doesn't exist`;
    res.render(`index`, locals);
  } else {
    articlesDB.removeArticle(articleToDelete);
    next();
  }
};

function validateArticleGetEdit(req, res, next) {
  resetLocals(articlesDB.all());
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  if (!renderArticle) {
    locals.message = `Article can't be edited because it doesn't exist`
    res.render('index', locals);
  } else {
    next();
  }
};

function validateArticleGetId(req, res, next) {
  resetLocals(articlesDB.all());
  let renderArticle = articlesDB.findArticle(req.params.urlTitle);
  if (!renderArticle) {
    locals.message = `Article doesn't exist, please enter a new article`;
    res.render('new', locals);
  } else {
    next();
  }
}

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

module.exports = {
  validateArticlePost,
  validateArticlePut,
  validateArticleDelete,
  validateArticleGetEdit,
  validateArticleGetId,
}