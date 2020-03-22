function normalize(response) {
    return response.results.bindings.map(obj =>
        Object.entries(obj)
            .reduce((new_obj, [k,v]) => (new_obj[k] = v.value, new_obj),
                    new Object()));
}


function pA(name){
    return `###  http://www.semanticweb.org/xekster/ontologies/2020/cinema#${name}
    :${name} rdf:type owl:NamedIndividual ,
                         :Ator .`
}


function pW(name){
    return `###  http://www.semanticweb.org/xekster/ontologies/2020/cinema#${name}
    :${name} rdf:type owl:NamedIndividual ,
                         :Escritor .`
}

function pM(name){
    return `###  http://www.semanticweb.org/xekster/ontologies/2020/cinema#${name}
    :${name} rdf:type owl:NamedIndividual ,
                         :Filme .`
}

var fs = require('fs')

var ac = require('./data/actors.json')
var wr = require('./data/writers.json')
var mo = require('./data/movies.json')

var actors = normalize(ac)
var movies = normalize(mo)
var writers = normalize(wr)

const re = /'| /g;
//console.log(pA(actors[1].aname.replace(" ","_")))

var stream = fs.createWriteStream("result.ttl", {flags:'a'})
actors.map(a =>{ stream.write( pA(a.aname.replace(re,"_")) + "\n" )}) 
writers.map(w =>{ stream.write( pW(w.wname.replace(re,"_")) + "\n" )})
movies.map(m =>{stream.write( pM(m.fname.replace(re,"_")) + "\n" )})
stream.end();