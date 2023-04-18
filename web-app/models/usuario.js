const { json } = require('body-parser');
const { api } = require('../services/api');

class Usuario{

    async cadastrarUsuario(novoUsuario){
        
        const dados = {
            nome: novoUsuario.nome,
            matricula: novoUsuario.matricula,
            funcao: novoUsuario.funcao,
            empresa: novoUsuario.empresa,
            perfil: novoUsuario.perfil
        };


        const response = await api.post('usuario', dados);
        

    }

    async listarTodosOsUsuarios(){
        const listaDeUsuarios = await api.get('usuario'); 
        return await (listaDeUsuarios.data);
    }
}


module.exports = Usuario;