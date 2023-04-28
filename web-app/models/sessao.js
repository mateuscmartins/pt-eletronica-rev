const { api } = require('../services/api');

class Sessao{

    async iniciarSessao(dadosUsuario){

        const response = await api.post('sessao', dadosUsuario);
        
        return response;
    };
}
module.exports = Sessao;