var Atores = module.exports
const axios = require('axios')

var prefixes = `
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX noInferences: <http://www.ontotext.com/explicit>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
    PREFIX c: <http://www.di.uminho.pt/prc2020/2020/2/cinema#>
`

var getLink = "http://localhost:7200/repositories/cinema2020" + "?query=" 



Atores.getAtor = async function(id){
    console.log(id)
    var query = `select ?nome ?sexo where { 
        c:${id} a c:Ator.
        OPTIONAL{
            c:${id} c:sexo ?sexo.
        }
    	OPTIONAL{
            c:${id} c:nome ?nome.
        }       
    }  ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}


Atores.getLista = async function(){
    var query = `select ?ator ?nome ?sexo  where { 
        ?ator a c:Ator.
        OPTIONAL{
            ?ator c:sexo ?sexo.
        }
    	OPTIONAL{
            ?ator c:nome ?nome.
        }       
    }  ` 
    var encoded = encodeURIComponent(prefixes + query)

    try{
        var response = await axios.get(getLink + encoded)
        return response.data
    }
    catch(e){
        throw(e)
    } 
}