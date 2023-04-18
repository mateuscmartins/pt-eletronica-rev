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
}


module.exports = Usuario;