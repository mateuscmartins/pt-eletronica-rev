const connection = require('../services/connection');

class OrdemServico{

    async cadastrarOrdemDeServico(dadosPT){
        
        await connection('ordem_servico').insert({
            ordem_servico: dadosPT.ordem_servico,
            descricao: dadosPT.descricao,
            data_inicio_previsto: dadosPT.data_inicio_previsto,
            data_termino_previsto: dadosPT.data_termino_previsto,
            local_servico: dadosPT.local_servico,
            area_restrita: dadosPT.area_restrita
        })

        return {os: dadosPT.ordem_servico};
    }
    
}

module.exports = OrdemServico;