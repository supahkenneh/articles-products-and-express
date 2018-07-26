const productList = [{id: 0, name: 'NMD', price: 150, inventory: 1}];

function all() {
  return productList;
}

function add(item) {
  productList.push(item);
};

//related to PUT request, changes name of item
function changeNameOf(num, name) {
 for (let i = 0; i < productList.length; i++){
   if (Number(num) === productList[i].id){
     productList[i].name = name;
     return true;
   } else {
     return false;
   }
 }
};

module.exports = {
  all: all,
  add: add,
  changeNameOf: changeNameOf,
}