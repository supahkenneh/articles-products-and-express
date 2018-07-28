const productList = [{ id: 0, name: 'NMD', price: 150, inventory: 1 }, { id: 1, name: 'Flyknits', price: 100, inventory: 1}];

function all() {
  return productList;
};

let idGenerator = 2;

function add(reqData) {
  let newProduct = {};
  newProduct.id = idGenerator;
  newProduct.name = reqData.name;
  newProduct.price = Number(reqData.price);
  newProduct.inventory = Number(reqData.inventory);
  productList.push(newProduct);
  idGenerator++
};

function remove(item) {
  let itemIndex = productList.indexOf(item);
  productList.splice(itemIndex, 1);
};

module.exports = {
  all: all,
  add: add,
  remove: remove,
}