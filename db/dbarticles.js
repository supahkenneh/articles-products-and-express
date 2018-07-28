let articleList = [{ title: "book", content: "book stuff", author: "book writer", urlTitle: "book" }, { title: "another book", content: "more book stuff", author: "another book writer", urlTitle: "anotherbook" }];

all = () => {
  return articleList
};

add = (item) => {
  let newArticle = {};
  newArticle.title = item.title;
  newArticle.author = item.author;
  newArticle.content = item.content;
  newArticle.urlTitle = item.title.replace(' ', '');
  articleList.push(newArticle);
}

findArticle = (item) => {
  let elem;
  articleList.map(element => {
    if (element.urlTitle === item) {
      elem = element;
    }
  })
  return elem;
};

editArticle = (newArticle, currArticle) => {
  currArticle.title = newArticle.title;
  currArticle.author = newArticle.author;
  currArticle.content = newArticle.content;
  currArticle.urlTitle = newArticle.title.replace(' ', '');
};

removeArticle = (item) => {
  let itemIndex = articleList.indexOf(item);
  articleList.splice(itemIndex, 1);
};

module.exports = {
  all,
  add,
  findArticle,
  editArticle,
  removeArticle,
}
