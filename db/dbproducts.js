const productList = [{id: 0, name: 'NMD', price: 150, inventory: 1}, {id:1, name: 'Flyknits', price: 100}];

function all() {
  return productList;
}

function add(item) {
  productList.push(item);
};

function remove(index) {
  let itemIndex = productList.indexOf(index);
  productList.splice(itemIndex, 1);
};


module.exports = {
  all: all,
  add: add,
  remove: remove,
}