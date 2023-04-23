const connection = require('../services/connection');

class Perigo{


    async cadastrarPerigo(dadosPT, codigoPT){
        
        const listaDePerigos = [];

        if(Array.isArray(dadosPT.perigos)){
            
            for(let i=0; i<dadosPT.perigos.length; i++){
                let perigo = {codigo_pt: codigoPT, cod_perigo: dadosPT.perigos[i]};
                listaDePerigos.push(perigo);        
            }

        }else{
            let perigo = {codigo_pt: codigoPT, cod_perigo: dadosPT.perigos};
            listaDePerigos.push(perigo); 
        }
        
        await connection('perigos_pt').insert(listaDePerigos);
    }
    
}

module.exports = Perigo;