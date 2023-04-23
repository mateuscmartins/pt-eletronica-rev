const connection = require('../services/connection');
const dataDeHoje = require('../services/dataAtual')

class PermissaoDeTrabalho{


    async cadastrarPermissaoDeTrabalho(dadosPT){
        
        const codigo_pt =  await connection('permissao_trabalho').insert({
            ordem_servico: dadosPT.ordem_servico,
            emissor: "TROCAR",
            data_emissao: dataDeHoje,
        })

        return codigo_pt;
    }
    
}

module.exports = PermissaoDeTrabalho;