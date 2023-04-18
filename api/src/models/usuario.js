//Importando o módulo de conexão com o banco de dados de desenvolvimento
const connection = require('../db/connection');

async function create(dados) {

    //Armazenando os dados enviados pela requisção POST
    const { matricula, nome, funcao, empresa, perfil } = dados;

    //Armazenando dados no banco de dados na tabela usuarios
    await connection('usuarios').insert({
        matricula,
        nome,
        funcao,
        empresa,
        perfil
    })

    return true;
}

module.exports = { create };