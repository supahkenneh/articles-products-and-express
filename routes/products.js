const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get(`/`, (req, res) => {
  console.log(`product wanted`);
  res.send(`Product Page`);
})

module.exports = router;