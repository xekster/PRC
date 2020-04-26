var Atores = module.exports
const axios = require('axios')

function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
}

function myNormalize(r){
    return r.results.bindings.map(o => {
        var novo = {}
        for (let [k, v] of Object.entries(o)) {
            novo[k] = v.value
          }
        return novo  
    })
}

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 


Atores.getLista = async function(){
    var query = `SELECT ?a ?idAtor ?nome ?sexo where{
        ?a a c:Ator.
        ?a c:nome ?nome.
        ?a c:sexo ?sexo.
        bind(strafter(str(?a), 'cinema#') as ?idAtor) .
    }
    order by ?nome` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getProduziu = async function(idAtor){
    var query = `select distinct ?f ?tit ?idFilme where {
        c:${idAtor} c:produziu ?f .
        ?f c:título ?tit.
        bind(strafter(str(?f), 'cinema#') as ?idFilme) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getRealizou = async function(idAtor){
    var query = `select distinct ?f ?tit ?idFilme where {
        c:${idAtor} c:realizou ?f .
        ?f c:título ?tit.
        bind(strafter(str(?f), 'cinema#') as ?idFilme) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}

Atores.getRepresenta = async function(idAtor){
    var query = `select distinct ?p ?nome ?idPersonagem where {
        c:${idAtor} c:representa ?p .
        ?p c:nome ?nome.
        bind(strafter(str(?p), 'cinema#') as ?idPersonagem) .
    }` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}




async function getAtorAtomica(idAtor){
    var query = `SELECT ?nome ?sexo where{
        ?${idAtor} a c:Ator.
        ?${idAtor} c:nome ?nome.
        ?${idAtor} c:sexo ?sexo.
    }` 
    var encoded = encodeURIComponent(prefixes + query)
    try{
        var response = await axios.get(getLink + encoded)
        return myNormalize(response.data)
    }
    catch(e){
        throw(e)
    } 
}
  
Atores.getAtor = async function(idAtor){
    try{
        var atomica = await getAtorAtomica(idAtor)
        var produziu = await Atores.getProduziu(idAtor)
        var realizou = await Atores.getRealizou(idAtor)
        var representa = await Atores.getRepresenta(idAtor)


        var ator = {
            info : atomica[0],
            produziu : produziu,
            realizou : realizou,
            representa : representa
        }
        return ator
    }
    catch(e){
        throw(e)
    }
}