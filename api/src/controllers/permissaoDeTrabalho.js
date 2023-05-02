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


    async lerPTEspecifica(req, res){

        const codigo_pt = req.params.codigo_pt;

        const permissaoDeTrabalho = 
            await connection('permissao_trabalho')
                .select(
                    'permissao_trabalho.codigo_pt as PT', 
                    'permissao_trabalho.ordem_servico',
                    'permissao_trabalho.emissor',
                    'usuarios.nome as nome_emissor',
                    'usuarios.funcao as funcao_emissor',
                    'permissao_trabalho.data_emissao',
                    'permissao_trabalho.data_encerramento',
                    'permissao_trabalho.status_pt', 
                    'ordem_servico.descricao',
                    'ordem_servico.data_inicio_previsto',
                    'ordem_servico.data_termino_previsto',
                    'ordem_servico.data_inicio_real',
                    'ordem_servico.data_termino_real',
                    'ordem_servico.local_servico',
                    'ordem_servico.area_restrita'
                )
                .from('permissao_trabalho')
                .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
                .leftJoin('usuarios', 'usuarios.matricula', 'permissao_trabalho.emissor')
                .where('permissao_trabalho.codigo_pt', '=',  codigo_pt)
                .first()
        

        const listaDeFuncionarios = 
            await connection('funcionarios_pt')
                .select(
                    "funcionarios_pt.matricula",
                    "funcionarios_pt.ciente",
                    "funcionarios_pt.data_ciencia",
                    "usuarios.nome",
                    "usuarios.funcao",
                    "usuarios.perfil",
                    "usuarios.empresa"
                )
                .from('funcionarios_pt')
                .leftJoin('usuarios', 'usuarios.matricula', 'funcionarios_pt.matricula')
                .where('funcionarios_pt.codigo_pt', '=',  codigo_pt)

        const listaDeRiscos = 
            await connection('riscos_pt')
                    .select(
                        'riscos_pt.cod_risco',
                        'riscos.descricao_risco'
                    )
                    .from('riscos_pt')
                    .leftJoin('riscos', 'riscos.cod_risco', 'riscos_pt.cod_risco')
                    .where('riscos_pt.codigo_pt', '=', codigo_pt)

        const listaDePerigos = 
            await connection('perigos_pt')
                    .select(
                        'perigos_pt.cod_perigo',
                        'perigos.descricao_perigo'
                    )
                    .from('perigos_pt')
                    .leftJoin('perigos', 'perigos.cod_perigo', 'perigos_pt.cod_perigo')
                    .where('perigos_pt.codigo_pt', '=', codigo_pt)

        const listaDeEquipamentos = 
            await connection('equipamentos_pt')
                    .select(
                        'equipamentos_pt.cod_equipamento',
                        'equipamentos.descricao_equipamento'
                    )
                    .from('equipamentos_pt')
                    .leftJoin('equipamentos', 'equipamentos.cod_equipamento', 'equipamentos_pt.cod_equipamento')
                    .where('equipamentos_pt.codigo_pt', '=', codigo_pt)

        const listaDeMedidasPreventivas = 
            await connection('medidas_preventivas_pt')
                    .select(
                        'medidas_preventivas_pt.cod_medida_preventiva',
                        'medidas_preventivas.descricao_medida_preventiva'
                    )
                    .from('medidas_preventivas_pt')
                    .leftJoin('medidas_preventivas', 'medidas_preventivas.cod_medida_preventiva', 'medidas_preventivas_pt.cod_medida_preventiva')
                    .where('medidas_preventivas_pt.codigo_pt', '=', codigo_pt)
            
        permissaoDeTrabalho.funcionarios = listaDeFuncionarios;
        permissaoDeTrabalho.riscos = listaDeRiscos;
        permissaoDeTrabalho.perigos = listaDePerigos;
        permissaoDeTrabalho.equipamentos = listaDeEquipamentos;
        permissaoDeTrabalho.medidasPreventivas = listaDeMedidasPreventivas;

        return res.json(permissaoDeTrabalho);
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
            
    },
    
    async buscarPTsPorProfissional(req, res){
        const matriucla = req.params.matricula;

        const listaDePermissoesDeTrabalho = 
            await connection('funcionarios_pt')
            .select(
                'funcionarios_pt.codigo_pt',
                'permissao_trabalho.status_pt',
                'ordem_servico.ordem_servico', 
                'ordem_servico.descricao'
            )
            .from('funcionarios_pt')
            .leftJoin('permissao_trabalho','permissao_trabalho.codigo_pt' ,'funcionarios_pt.codigo_pt')
            .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
            .where("funcionarios_pt.matricula", "=", matriucla)

        return res.json(listaDePermissoesDeTrabalho);
    }

}