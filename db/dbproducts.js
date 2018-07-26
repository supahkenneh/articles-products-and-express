const productList = [];

function all() {
  return productList;
}

function add(item) {
  productList.push(item);
};

function find(item) {
  if (productList.indexOf(item)) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  all: all,
  add: add,
  find: find,
}