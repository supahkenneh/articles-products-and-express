const express = require('express');
const router = express.Router();
const db = require('../db/knex');

router.get('/', (req, res) => {
  db.select().from('products')
    .then(result => {
      res.json(result);
    })
    .catch(err => console.log(err));
});

router.get('/new', (req, res) => {
  res.render('new', {
    showProducts: true,
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.select().from('products').where('id', id)
  .then(result => {
    res.render('product', {
      product: result[0]
    })
  })
  .catch(err => console.log(err));
});

router.get('/:id/edit', (req, res) => {
  const id = req.params.id;
  db.select().from('products').where('id', id)
  .then(result => {
    res.render('edit', {
      showProducts: true,
      product: result[0]
    })
  })
});

router.post('/', (req, res) => {
  const data = req.body;
  db('products').insert({ name: data.name, price: data.price, inventory: data.inventory })
    .then(result => {
      res.redirect('/products');
    })
    .catch(err => console.log(err));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  db.select().from('products').where('id', id)
    .then(result => {
      if (result.length < 1) {
        res.redirect('/new');
      }
      return result;
    })
    .then(result => {
      db('products').where('id', id)
        .update({
          name: data.name,
          price: data.price,
          inventory: data.inventory
        })
    })
    .then(result => {
      res.redirect(`/products/${id}`)
    })
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.select().from('products').where('id', id)
  .then(result => {
    if (result.length < 1) {
      res.redirect(`/products/${id}`)
    }
    return result;
  })
  .then(result => {
    db('products').where('id', id).del();
  })
  .catch(err => console.log(err));
});

module.exports = router;

// let locals = {
//   showProducts: true,
//   products: productDB.all(),
//   deleteError: false,
//   message: null,
//   showArticles: false,
// }

// /****** METHOD STUFF******/
// router.get(`/`, (req, res) => {
//   resetLocals(productDB.all());
//   res.render('index', locals)
// });

// router.get(`/new`, (req, res) => {
//   resetLocals(productDB.all());
//   res.render('new', locals);
// });

// router.get(`/:id`, validation.validateGetById, (req, res) => {
//   let renderItem = productDB.findItem(req.params.id);
//   res.render('product', {
//     showProducts: true,
//     product: renderItem,
//   })
// });

// router.get(`/:id/edit`, validation.validateGetEdit, (req, res) => {
//   let renderItem = productDB.findItem(req.params.id);
//   res.render('edit', {
//     showProducts: true,
//     product: renderItem,
//   });
// });


// //post items
// router.post(`/`, validation.validatePost, (req, res) => {
//   productDB.add(req.body);
//   res.redirect(`/products`);
// });

// //put items
// router.put(`/:id`, validation.validatePut, (req, res) => {
//   res.redirect(`/products/${req.params.id}`);
// });

// //delete items
// router.delete(`/:id`, validation.validateDelete, (req, res) => {
//   res.render('index', {
//     showProducts: true,
//     message: 'Item successfully deleted!',
//     products: productDB.all(),
//   });
// });

// module.exports = router;

// /****** HELPER STUFF******/

// function resetLocals(list) {
//   return {
//     showArticles: false,
//     list: list ? list : [],
//     deleteError: false,
//     message: null,
//     showProducts: true,
//   }
// }