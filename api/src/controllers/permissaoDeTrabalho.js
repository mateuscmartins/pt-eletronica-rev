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
    
    },

    async buscarPTsFiltradas(req, res) {
        
        const {codigo_pt, status_pt, data_emissao, ordem_servico, emissor} = req.body;

        const filtros = {};

        if(codigo_pt){
            filtros.codigo_pt = codigo_pt;
        }

        if(status_pt){
            filtros.status_pt = status_pt;
        }

        if(data_emissao){
            filtros.data_emissao = data_emissao;
        }

        if(ordem_servico){
            filtros.codigo_os = ordem_servico;
        }

        if(emissor){
            filtros.emissor = emissor;
        }
        
        const listaFiltrada = 
            await connection('permissao_trabalho')
            .select(
                'permissao_trabalho.codigo_pt', 
                'permissao_trabalho.status_pt',
                'permissao_trabalho.ordem_servico as codigo_os', 
                'ordem_servico.descricao')
            .from('permissao_trabalho')
            .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
            .where(filtros)

        return res.json(listaFiltrada);
            
    } 

}