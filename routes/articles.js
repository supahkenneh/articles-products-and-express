const express = require('express');
const router = express.Router();
const db = require('../db/knex');

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
  db.select().from('articles').where('urltitle', urltitle)
  .then(result => {
    res.render('article', {
      article: result[0]
    })
  })
  .catch(err => console.log(err));
});

router.get('/:urltitle/edit', (req, res) => {
  const urltitle = req.params.urltitle;
  db.select().from('articles').where('urltitle', urltitle)
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
    res.render('edit', {
      showArticles: true,
      article: result
    })
  })
  .catch(err => console.log(err));
});

/************* METHODS *************/
router.post('/', (req, res) => {
  const data = req.body;
  db.select().from('articles').where('title', data.title)
  .then(result => {
    if (result.length > 1) {
      res.render('new', {
        showArticles: true,
        message: `Article already exists, consider changing the name?`
      })
    }
    return result; 
  })
  .then(result => {
    return db('articles').insert({title: data.title, author: data.author, content: data.content, urltitle: encodeURI(data.title)})
  })
  .then(result => {
    res.redirect('/articles');
  })
  .catch(err => console.log(err));
});

router.put('/:urltitle', (req, res) => {
  const urltitle = req.params.urltitle;
  const data = req.body;
  db.select().from('articles').where('urltitle', urltitle)
  .then(result => {
    if (result.length < 1) {
      res.redirect(`/articles/${urltitle}/edit`);
    }
    return result;
  })
  .then(result => {
    return db('articles').where('urltitle', urltitle)
    .update({
      title: data.title,
      author: data.author,
      content: data.content,
      urltitle: encodeURI(data.title)
    })
  })
  .then(result => {
    res.redirect(`/articles/${urltitle}`)
  })
  .catch(err => console.log(err));
});

router.delete('/:urltitle', (req, res) => {
  const urltitle = req.params.urltitle;
  db.select().from('articles').where('urltitle', urltitle)
  .then(result => {
    if (result.length < 1) {
      res.redirect(`/articles/${urltitle}`)
    }
    return result;
  })
  .then(result => {
    return db('articles').where('urltitle', urltitle).del();
  })
  .then(result => {
    res.redirect('/articles');
  })
  .catch(err => console.log(err));
});

module.exports = router;

// /***** METHOD STUFF *****/
// router.get(`/`, (req, res) => {
//   resetLocals(articlesDB.all());
//   res.render('index', locals);
// });

// router.get(`/new`, (req, res) => {
//   resetLocals(articlesDB.all());
//   res.render('new', locals);
// });

// router.get(`/:urlTitle`, validation.validateArticleGetId, (req, res) => {
//   let renderArticle = articlesDB.findArticle(req.params.urlTitle);
//   res.render('article', {
//     showArticles: true,
//     article: renderArticle,
//   })
// });

// router.get(`/:urlTitle/edit`, validation.validateArticleGetEdit, (req, res) => {
//   let renderArticle = articlesDB.findArticle(req.params.urlTitle);
//   res.render('edit', {
//     showArticles: true,
//     article: renderArticle,
//   });
// });

// //post items
// router.post(`/`, validation.validateArticlePost, (req, res) => {
//   articlesDB.add(req.body);
//   res.render('index', locals);
// });

// //put items
// router.put(`/:urlTitle`, validation.validateArticlePut, (req, res) => {
//   res.redirect(303, `/articles/${articleToEdit.urlTitle}`);
// });

// //delete items
// router.delete(`/:urlTitle`, validation.validateArticleDelete, (req, res) => {
//   res.render('index', {
//     showArticles: true,
//     message: `Article successfully deleted`,
//     articles: articlesDB.all(),
//   });
// });

// module.exports = router;

// /****** HELPER STUFF******/

// function resetLocals(list) {
//   return {
//     showArticles: true,
//     list: list ? list : [],
//     deleteError: false,
//     message: null,
//     showProducts: false,
//   }
// }