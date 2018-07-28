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

function findItem(item) {
  let elem;
  productList.map(element => {
    if(element.id === Number(item)){
      elem = element;
    }
  })
  return elem;
};

function editItem (newItem, currItem) {
  currItem.name = newItem.name;
  currItem.price = newItem.price;
  currItem.inventory = newItem.inventory;
}

module.exports = {
  all, 
  add, 
  remove,
  findItem,
  editItem,
}