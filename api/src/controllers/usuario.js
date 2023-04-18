//Importando o módulo de conexão com o banco de dados de desenvolvimento
const connection = require('../db/connection');

module.exports = {
    
    
    async criar(req, res) {

        //Armazenando os dados enviados pela requisção POST
        const { matricula, nome, funcao, empresa, perfil } = req;
    
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