//Importando o módulo de conexão com o banco de dados de desenvolvimento
const connection = require('../db/connection');

module.exports = {
    
    
    async criar(req, res) {

        //Armazenando os dados enviados pela requisção POST
        const { matricula, nome, funcao, empresa, perfil } = req.body;
    
        //Armazenando dados no banco de dados na tabela usuarios
        await connection('usuarios').insert({
            matricula,
            nome,
            funcao,
            empresa,
            perfil
        })
    
        return res.json({matricula});
    },


    async lerTodos(req, res){

        const usuarios = await connection('usuarios').select(['matricula', 'nome', 'funcao', 'perfil', 'empresa']);
    
        return res.json(usuarios);
    },

    async listarFuncoes(req, res){

        const funcoes = await connection('usuarios').distinct('funcao');
    
        return res.json(funcoes);
    },


    async buscarUsuariosFiltrados(req, res) {
        
        const {matricula, nome, funcao, perfil} = req.body;

        const filtros = {};

        if(matricula){
            filtros.matricula = matricula;
        }

        if(nome){
            filtros.nome = nome;
        }

        if(funcao){
            filtros.funcao = funcao;
        }

        if(perfil){
            filtros.perfil = perfil;
        }
        
        const listaFiltrada = 
            await connection('usuarios')
            .select(
                'matricula', 
                'nome',
                'funcao',
                'perfil',
                'empresa')
            .from('usuarios')
            .where(filtros)

        return res.json(listaFiltrada);
            
    },

    async lerUsuarioEspecífico(req, res){

        const matricula = req.params.matricula;

        const dadosUsuarios = 
        await connection('usuarios')
        .select(
            'matricula',
            'nome',
            'funcao',
            'empresa',
            'perfil'
        )
        .where('matricula', '=', matricula)
        .first()

        return res.json(dadosUsuarios);

    }


    /*//Excluindo usuario do banco de dados
    async delete(request, response){
        
        //Recuperando a matricula enviada como parametro
        const { matricula } = request.params;
        console.log(matricula)
        await connection('usuarios').where('matricula', matricula).del();
        
        return response.status(204).send();
    
    },*/
}