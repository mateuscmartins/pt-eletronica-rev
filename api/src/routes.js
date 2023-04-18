//Importa o pacote do express
const express = require('express');

//Importa os Controllers
//const SessaoController = require('./controllers/SessaoController');
const UsuariosController = require('./controllers/usuario');
//const PTController = require('./controllers/PTController');

//Instancia o módulo de rotas do express
const routes = express.Router();


//Rota de Login
//routes.post('/sessao', SessaoController.create);


//Rota para lidar com o armazenamentos dos usuários no sistema
//  POST - cadastra usuário
//  GET - busca todos os usuários
//  DELETE/:matricula - deleta usuário do sistema
//  GET/:matricula - exibe dados do usuario específico da matrícula
routes.post('/usuario', UsuariosController.cadastrarNovoUsuario);
//routes.get('/usuario', UsuariosController.index);
//routes.delete('/usuario/:matricula', UsuariosController.delete)

//Rota para criação de nova Permissão de Trabalho
//routes.post('/permissao_trabalho', PTController.create);


//Exporta o modulo de rotas para ser utilizado por outros módulos
module.exports = routes;