let articleList = [{ title: "Cats", content: "Stand in front of the computer screen has closed eyes but still sees you munch on tasty moths or scratch the furniture. Plan steps for world domination rub face on owner yet wake up human for food at 4am sleep on dog bed, force dog to sleep on floor. Has closed eyes but still sees you. Litter kitter kitty litty little kitten big roar roar feed me meow poop in litter box, scratch the walls. Drool sniff all the things. Man running from cops stops to pet cats, goes to jail. You have cat to be kitten me right meow sit by the fire or shake treat bag, but my left donut is missing, as is my right yet dont wait for the storm to pass, dance in the rain but cat not kitten around . Pushes butt to face try to hold own back foot to clean it but foot reflexively kicks you in face, go into a rage and bite own foot, hard milk the cow give me attention or face the wrath of my claws find box a little too small and curl up with fur hanging out . Give me attention or face the wrath of my claws chew the plant or put butt in owner's face or meow meow, i tell my human ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss throwup on your pillow meowwww.  ", author: "Crazy Cat Lady", urlTitle: "cats" }, { title: "Cats II", content: "Chase mice. Burrow under covers leave fur on owners clothes and poop in the plant pot or chase imaginary bugs, or eat owner's food. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back meow freak human out make funny noise mow mow mow mow mow mow success now attack human terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry when in doubt, wash. Damn that dog purr. Purrr purr littel cat, little cat purr purr hopped up on catnip, so sniff all the things or cough hairball, eat toilet paper meow to be let in. Rub face on everything dont wait for the storm to pass, dance in the rain and meow loudly just to annoy owners and thug cat . Step on your keyboard while you're gaming and then turn in a circle .", author: "Crazy Cat Man", urlTitle: "catsii" }];

all = () => {
  return articleList
};

add = (item) => {
  let newArticle = {};
  newArticle.title = item.title;
  newArticle.author = item.author;
  newArticle.content = item.body;
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
