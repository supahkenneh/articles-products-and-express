let articleList = [{ title: "book", body: "book stuff", author: "book writer", urlTitle: "book" }, { title: "another book", body: "more book stuff", author: "another book writer", urlTitle: "anotherbook" }];

all = () => {
  return articleList
};

add = (item) => {
  let newArticle = {};
  newArticle.title = item.title;
  newArticle.author = item.author;
  newArticle.body = item.body;
  newArticle.urlTitle = item.title.trim();
}

findArticle = (item) => {
  let elem;
  articleList.map(element => {
    if (element.urlTitle === item) {
      elem = element;
    }
  })
  return elem;
}

module.exports = {
  all,
  add,
  findArticle,
}
