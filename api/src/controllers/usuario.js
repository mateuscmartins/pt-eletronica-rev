//Importando o módulo de conexão com o banco de dados de desenvolvimento
const connection = require('../db/connection');
const { create } = require('../models/usuario');



module.exports = {
    
    /* 
    async index(request, response){
        
        //Buscando lista de usuarios no banco de dados
        const usuarios = await connection('usuarios').select('*');
    
        return response.json(usuarios);
            
    },
    */
    
    cadastrarNovoUsuario(req, res) {

        const cadastro = create(req.body);
        //Retornando a matricula do usuario para a aplicação
        if(cadastro){
            return res.json({message: "Cadastro realizado com sucesso"});
        }else{
            return res.json({message: "Falha no cadastro"});
        }
        
    },

    /*//Excluindo usuario do banco de dados
    async delete(request, response){
        
        //Recuperando a matricula enviada como parametro
        const { matricula } = request.params;
        console.log(matricula)
        await connection('usuarios').where('matricula', matricula).del();
        
        return response.status(204).send();
    
    },*/
}