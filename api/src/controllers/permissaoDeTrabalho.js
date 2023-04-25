const connection = require('../db/connection');

module.exports = {

    async lerTodos(req, res){

        const permissoesDeTrabalho = 
            await connection('permissao_trabalho')
                .select( 
                    'permissao_trabalho.codigo_pt', 
                    'permissao_trabalho.status_pt',
                    'ordem_servico.ordem_servico', 
                    'ordem_servico.descricao')
                .from('permissao_trabalho')
                .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
    
        return res.json(permissoesDeTrabalho);
    
    }

}