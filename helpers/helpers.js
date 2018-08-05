const db = require('../db/knex');

function selectAllProducts(item) {
  return db.select().from('products').where('id', item)
};

function updateProduct(item, data) {
  return db('products').where('id', item).update({
    name: data.name,
    price: data.price,
    inventory: data.inventory
  })
};

function selectAllArticles(url) {
  return db.select().from('articles').where('urltitle', url)
};

function findDupes(request) {
  const suspect = encodeURI(request.title.toLowerCase());
  return db.select().from('articles').where('urltitle', suspect)
};

function updateArticle(url, data) {
  return db('articles').where('urltitle', url).update({
    title: data.title,
    author: data.author,
    content: data.content,
    urltitle: encodeURI(data.title.toLowerCase())
  })
};

function deleteProduct(item) {
  return db('products').where('id', item).del();
};

function deleteArticle(url) {
  return db('articles').where('urltitle', url).del();
};

function addProduct(newItem) {
  return db('products').insert({ name: newItem.name, price: newItem.price, inventory: newItem.inventory });
};

function addArticle(newArticle) {
  return db('articles').insert({
    title: newArticle.title,
    author: newArticle.author,
    content: newArticle.content,
    urltitle: encodeURI(newArticle.title)
  });
};

module.exports = {
  selectAllProducts,
  selectAllArticles,
  updateProduct,
  updateArticle,
  deleteProduct,
  deleteArticle,
  addProduct,
  addArticle,
  findDupes
};