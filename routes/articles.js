const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const exphbs = require('express-handlebars');
const articlesDB = require('../db/dbarticles');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

let locals = {
  showProducts: false,
  showArticles: false,
  articles: articlesDB.all(),
  deleteError: false,
  message: null,
}

router.get(`/`, (req, res) => {
  locals.showArticles = true;
  res.render('index', locals);
});

router.get(`/new`, (req, res) => {
  res.render('new', locals);
});

router.get(`/:title`, (req, res) => {
  let title = req.params.title;
  articlesDB.all().map(elem => {
    if (elem.title === title) {
      res.render(`article`, {
        article: elem,
      })
    } 
  })
});

// router.post(`/`, urlencoded)

module.exports = router;

/****** HELPER STUFF******/

function resetLocals() {
  locals = {
    showProducts: false,
    products: articlesDB.all(),
    deleteError: false,
    message: null,
    showArticles: true,
  }
}