const connection = require('../services/connection');

class Equipamento{


    async cadastrarEquipamento(dadosPT, codigoPT){
        
        const listaDeEquipamentos = [];

        if(Array.isArray(dadosPT.equipamentos)){
            
            for(let i=0; i<dadosPT.equipamentos.length; i++){
                let equipamento = {codigo_pt: codigoPT, cod_equipamento: dadosPT.equipamentos[i]};
                listaDeEquipamentos.push(equipamento);        
            }

        }else{
            let equipamento = {codigo_pt: codigoPT, cod_equipamento: dadosPT.equipamentos};
            listaDeEquipamentos.push(equipamento); 
        }
        
        await connection('equipamentos_pt').insert(listaDeEquipamentos);
    }
    
}

module.exports = Equipamento;