\c postgres;

DROP DATABASE IF EXISTS articles_products_db;
DROP USER IF EXISTS da_user;

CREATE USER da_user WITH PASSWORD 'password';
CREATE DATABASE articles_products_db WITH OWNER da_user;

\c articles_products_db da_user;

CREATE TABLE articles (
  id serial NOT NULL PRIMARY KEY,
  title varchar(100) NOT NULL,
  author varchar(50) NOT NULL,
  content text,
  urltitle varchar(150) NOT NULL
);

CREATE TABLE products (
  id serial NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  price decimal(8, 2),
  inventory integer
);

INSERT INTO articles
VALUES (
  default,
  'Cats',
  'Crazy Cat Lady',
  'Give me attention or face the wrath of my claws chew the plant or put butt in owner face or meow meow, i tell my human ccccccccccccaaaaaaaaaaaaaaatttttttttttttttttssssssssssssssss throwup on your pillow meowwww.',
  'cats'
);

INSERT INTO articles 
VALUES (
  default,
  'Cats II',
  'Crazy Cat Man',
  'Chase mice. Burrow under covers leave fur on owners clothes and poop in the plant pot or chase imaginary bugs, or eat owner food. Lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back meow freak human out make funny noise mow mow mow mow mow mow success now attack human terrorize the hundred-and-twenty-pound rottweiler and steal his bed, not sorry when in doubt, wash. Damn that dog purr. Purrr purr littel cat, little cat purr purr hopped up on catnip, so sniff all the things or cough hairball, eat toilet paper meow to be let in. Rub face on everything dont wait for the storm to pass, dance in the rain and meow loudly just to annoy owners and thug cat . Step on your keyboard while youre gaming and then turn in a circle.',
  'cats%20ii'
);

INSERT INTO products 
VALUES (
  default,
  'NMD',
  150.00,
  5
);

INSERT INTO products 
VALUES (
  default,
  'Flyknits',
  100.00,
  8
);
