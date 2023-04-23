const connection = require('../services/connection');

class MedidaPreventiva{


    async cadastrarMedidaPreventiva(dadosPT, codigoPT){
        
        const listaDeMedidaPreventiva = [];

        if(Array.isArray(dadosPT.medida_preventiva)){
            
            for(let i=0; i<dadosPT.medida_preventiva.length; i++){
                let medidaPreventiva = {codigo_pt: codigoPT, cod_medida_preventiva: dadosPT.medida_preventiva[i]};
                listaDeMedidaPreventiva.push(medidaPreventiva);        
            }

        }else{
            let medidaPreventiva = {codigo_pt: codigoPT, cod_medida_preventiva: dadosPT.medida_preventiva};
            listaDeMedidaPreventiva.push(medidaPreventiva); 
        }
        
        await connection('medidas_preventivas_pt').insert(listaDeMedidaPreventiva);
    }
    
}

module.exports = MedidaPreventiva;