const connection = require('../services/connection');

class Risco{


    async cadastrarRisco(dadosPT, codigoPT){
        
        const listaDeRiscos = [];

        if(Array.isArray(dadosPT.riscos)){
            
            for(let i=0; i < dadosPT.riscos.length; i++){
                let risco = {codigo_pt: codigoPT, cod_risco: dadosPT.riscos[i]};
                listaDeRiscos.push(risco);        
            }

        }else{
            let risco = {codigo_pt: codigoPT, cod_risco: dadosPT.riscos};
            listaDeRiscos.push(risco); 
        }
        
        await connection('riscos_pt').insert(listaDeRiscos);
    }
    
}

module.exports = Risco;