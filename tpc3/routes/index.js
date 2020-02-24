var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7200/repositories')
      .then(dados =>res.render('index', {lista: dados.data}))
      .catch(erro => res.status(500).jsonp(erro))
});

module.exports = router;
