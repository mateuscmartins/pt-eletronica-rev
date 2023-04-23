//Importando o módulo knex
const knex = require('knex');

//Importando as configurações de desenvonvilmento do knex
const configuration = require('../knexfile');

//Instanciando a conexão com o banco de dados de desenvolvimento
const connection = knex(configuration.development);

//Exportando a instância de conexão do banco de dados
module.exports = connection;