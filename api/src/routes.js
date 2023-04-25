//Importa o pacote do express
const express = require('express');

//Importa os Controllers
//const SessaoController = require('./controllers/SessaoController');
const UsuariosController = require('./controllers/usuario');
const PTController = require('./controllers/permissaoDeTrabalho');

//Instancia o módulo de rotas do express
const routes = express.Router();


//Rota de Login
//routes.post('/sessao', SessaoController.create);


//Rotas para lidar com o armazenamentos dos usuários no sistema
//  POST - cadastra usuário
//  GET - busca todos os usuários
//  DELETE/:matricula - deleta usuário do sistema
//  GET/:matricula - exibe dados do usuario específico da matrícula
routes.post('/usuario', UsuariosController.criar);
routes.get('/usuario', UsuariosController.lerTodos);
//routes.delete('/usuario/:matricula', UsuariosController.delete)

//Rotas para lidar com as Permissões de Trabalho
//  GET - busca todos os usuários
routes.get('/permissao_trabalho', PTController.lerTodos);


//Exporta o modulo de rotas para ser utilizado por outros módulos
module.exports = routes;