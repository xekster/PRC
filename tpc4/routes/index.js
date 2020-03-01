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

var getLink = "http://localhost:7200/repositories/amd" + "?query="

//var query = `SELECT ?s WHERE {?s rdf:type h:Advogado}`
//var query = `SELECT ?nome WHERE {?s h:nome ?nome} ORDER BY DESC (?nome)`

var query = `select ?tit (count(?part) as ?nparts) ?id where {
    ?id rdf:type amd:Obra.
    ?id amd:título ?tit.
    ?id amd:temPartitura ?part.
  } 
  group by ?tit ?id 
  order by ?tit`
var encoded = encodeURIComponent(prefixes+query)

/* GET home page. */
router.get('/', function(req, res, next) {

axios.get(getLink + encoded)
    .then (dados => {
      //console.log(JSON.stringify(dados.data))
      var mydata = []
      mydata = dados.data.results.bindings.map(obra=>{ return {
                                                      id: obra.id.value.split('#')[1],
                                                      tit: obra.tit.value,
                                                      nparts: obra.nparts.value }})
      console.log(JSON.stringify(mydata))
      res.render('index',{obras:mydata})
    })
    .catch (erro => res.render('error', {error:erro}))


});

module.exports = router;
