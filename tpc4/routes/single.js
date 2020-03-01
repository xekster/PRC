var express = require('express');
var router = express.Router();
var axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX amd: <http://prc.di.uminho.pt/2020/amd#>
`

router.get('/:id', function(req, res, next) {

  var getLink = "http://localhost:7200/repositories/amd" + "?query="

  var query = "select ?part ?des where { amd:"+req.params.id+" rdf:type amd:Obra. amd:" +req.params.id+" amd:temPartitura ?part. ?part amd:path ?des } "

  var encoded = encodeURIComponent(prefixes+query)

  axios.get(getLink + encoded)
    .then (dados => {
      console.log(JSON.stringify(dados.data))
      var mydata = []
      mydata = dados.data.results.bindings.map(obra=>{ return {
                                                      id: obra.part.value.split('#')[1],
                                                      des: obra.des.value}})
      console.log(JSON.stringify(mydata))
      res.render('single',{obras:mydata})
    })
    .catch (erro => res.render('error', {error:erro}))
    
});
module.exports = router;
