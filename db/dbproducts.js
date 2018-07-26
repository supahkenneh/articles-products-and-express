const productList = [{id: 0, name: 'NMD', price: 150, inventory: 1}];

function all() {
  return productList;
}

function add(item) {
  productList.push(item);
};

function remove(index) {
  productList.splice(index, 1);
}

module.exports = {
  all: all,
  add: add,
  remove: remove,
}