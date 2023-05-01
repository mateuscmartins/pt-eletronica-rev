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

    async listarUsuariosFiltrados(dadosFiltro){
        const listaDeUsuariosFiltrada = await api.post('usuario/filtrado', dadosFiltro);
        return listaDeUsuariosFiltrada.data
    }


    async listarFuncoes(){
        const listaDeFuncoes = await api.get('lista-funcoes');
        return listaDeFuncoes.data
    }
}


module.exports = Usuario;