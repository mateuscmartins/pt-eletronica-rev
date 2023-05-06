const connection = require('../db/connection');

module.exports = {

    async lerTodos(req, res){

        const permissoesDeTrabalho = 
            await connection('permissao_trabalho')
                .select( 
                    'permissao_trabalho.codigo_pt as PT', 
                    'permissao_trabalho.status_pt',
                    'ordem_servico.ordem_servico as codigo_os', 
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

        
        if(permissaoDeTrabalho.status_pt === "cancelada"){
            const dadosCancelamento = 
            await connection('cancelamento_pt')
            .select(
                'cancelamento_pt.motivo_cancelamento',
                'cancelamento_pt.matricula',
                'usuarios.nome'
            )
            .from('cancelamento_pt')
            .leftJoin('usuarios', 'usuarios.matricula', 'cancelamento_pt.matricula')
            .where('cancelamento_pt.codigo_pt', '=', codigo_pt)
            .first()
            
            permissaoDeTrabalho.infosDeCancelamento = dadosCancelamento;
        }

        

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
                'permissao_trabalho.codigo_pt as PT', 
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
                'funcionarios_pt.codigo_pt as PT',
                'permissao_trabalho.status_pt',
                'ordem_servico.ordem_servico as codigo_os', 
                'ordem_servico.descricao'
            )
            .from('funcionarios_pt')
            .leftJoin('permissao_trabalho','permissao_trabalho.codigo_pt' ,'funcionarios_pt.codigo_pt')
            .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
            .where("funcionarios_pt.matricula", "=", matriucla)

        return res.json(listaDePermissoesDeTrabalho);
    },


    async buscarPTsFiltradasPorProfissional(req, res) {
        
        const {matricula, codigo_pt, status_pt, data_emissao, ordem_servico, emissor} = req.body;

        const filtros = {matricula: matricula};

        if(codigo_pt){
            filtros.PT = codigo_pt;
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
            await connection('funcionarios_pt')
            .select(
                'funcionarios_pt.codigo_pt as PT',
                'permissao_trabalho.status_pt',
                'permissao_trabalho.data_emissao',
                'permissao_trabalho.emissor',
                'ordem_servico.ordem_servico as codigo_os', 
                'ordem_servico.descricao'
            )
            .from('funcionarios_pt')
            .leftJoin('permissao_trabalho','permissao_trabalho.codigo_pt' ,'funcionarios_pt.codigo_pt')
            .leftJoin('ordem_servico', 'ordem_servico.ordem_servico', 'permissao_trabalho.ordem_servico')
            .where(filtros)

        return res.json(listaFiltrada);
            
    },

    async alterarStatusDePermissaoDeTrabalho(req, res){

        const {matricula, codigo_pt, data, tipoDeAlteracao} = req.body;

        if(tipoDeAlteracao === "assinar"){

            const atualizar = await connection('funcionarios_pt')
            .where({codigo_pt: codigo_pt, matricula: matricula})
            .update({ciente: 'true', data_ciencia: data})

            const situacaoDaPT = await connection('funcionarios_pt')
            .where({codigo_pt: codigo_pt})
            .select("funcionarios_pt.ciente")

            let profissionaisDeAcordo = 0;

            for(let i =0; i < situacaoDaPT.length; i++){
                if(situacaoDaPT[i].ciente === 'true'){
                    profissionaisDeAcordo++
                }
            }

            if(profissionaisDeAcordo == situacaoDaPT.length){
                //aprovada
                await connection('permissao_trabalho')
                .where({codigo_pt: codigo_pt})
                .update({status_pt: 'aprovada'})
            }

            if(profissionaisDeAcordo > 0 && profissionaisDeAcordo < situacaoDaPT.length){
                //parcialmente aprovada
                await connection('permissao_trabalho')
                .where({codigo_pt: codigo_pt})
                .update({status_pt: 'parcialmente aprovada'})
            }

            return res.status(200).send();
        }


        if(tipoDeAlteracao === "concluir"){
            await connection('permissao_trabalho')
            .where({codigo_pt: codigo_pt})
            .update({status_pt: 'concluida', data_encerramento: data})

            return res.status(200).send();
        }

        if(tipoDeAlteracao === "cancelar"){

            const { motivo_cancelamento } = req.body;

            await connection('permissao_trabalho')
            .where({codigo_pt: codigo_pt})
            .update({status_pt: 'cancelada', data_encerramento: data})

            await connection('cancelamento_pt')
            .insert({
                codigo_pt: codigo_pt,
                motivo_cancelamento: motivo_cancelamento,
                matricula: matricula
            })
            
            return res.status(200).send();
        }

        
    }

}