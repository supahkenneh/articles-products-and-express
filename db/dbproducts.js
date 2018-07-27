const productList = [{ id: 0, name: 'NMD', price: 150, inventory: 1 }, { id: 1, name: 'Flyknits', price: 100, inventory: 1}];

function all() {
  return productList;
};

function generateId() {
  let randomId = Math.floor(Math.random() * 10);
  return randomId;
};

function add(reqData) {
  let newProduct = {};
  newProduct.id = generateId();
  newProduct.name = reqData.name;
  newProduct.price = Number(reqData.price);
  newProduct.inventory = Number(reqData.inventory);
  productList.push(newProduct);
};

function remove(itemId) {
  const findIndex = productList.findIndex(elem => {
    return Number(elem.id) === Number(itemId);
  });
  if (productList[findIndex]){
    productList.splice(findIndex, 1);
    return true;
  } else {
    return false;
  }
};


module.exports = {
  all: all,
  add: add,
  remove: remove,
}