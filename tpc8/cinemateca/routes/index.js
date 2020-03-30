var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')
var Atores = require('../controllers/atores')
var Personagens = require('../controllers/personagens')

/* GET filme por id. */
router.get('/filmes/:id', function(req, res, next) {
  Filmes.getFilme(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro no filme: ${e}`))
});

/* GET varios filmes. */
router.get('/filmes', function(req, res, next) {
  Filmes.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de filmes: ${e}`))
});

/* GET ator por id */
router.get('/atores/:id', function(req, res, next) {
  Atores.getAtor(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro no ator: ${e}`))
});

/* GET varios atoress. */
router.get('/atores', function(req, res, next) {
  Atores.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de atores: ${e}`))
});


/* GET personagem por id */
router.get('/personagens/:id', function(req, res, next) {
  Personagens.getPersonagem(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro no personagem: ${e}`))
});

/* GET varios personagens. */
router.get('/personagens', function(req, res, next) {
  Personagens.getLista()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).send(`Erro na listagem de personagens: ${e}`))
});



module.exports = router;
