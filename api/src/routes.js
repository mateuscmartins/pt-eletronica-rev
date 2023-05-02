//Importa o pacote do express
const express = require('express');

//Importa os Controllers
const SessaoController = require('./controllers/sessao');
const UsuariosController = require('./controllers/usuario');
const PTController = require('./controllers/permissaoDeTrabalho');

//Instancia o módulo de rotas do express
const routes = express.Router();


//Rota de para lidar com sistema de autenticação
routes.post('/sessao', SessaoController.criar);


//Rotas para lidar com o armazenamentos dos usuários no sistema
//  POST - cadastra usuário
//  POST - Realiza busca de usuarios no banco de dados conforme critérios de filtros
//  GET - busca todos os usuários
//  DELETE/:matricula - deleta usuário do sistema
//  GET/:matricula - exibe dados do usuario específico da matrícula
routes.post('/usuario', UsuariosController.criar);
routes.post('/usuario/filtrado', UsuariosController.buscarUsuariosFiltrados);
routes.get('/usuario', UsuariosController.lerTodos);
//routes.delete('/usuario/:matricula', UsuariosController.delete)


//Rota para enviar a lista de funcoes cadastradas no banco de dados
routes.get("/lista-funcoes", UsuariosController.listarFuncoes);

//Rotas para lidar com as Permissões de Trabalho
//  GET - busca todas as permissões de trabalho no banco de dados
//  POST - busca
routes.get('/permissao_trabalho', PTController.lerTodos);
routes.post('/permissao_trabalho/filtrada', PTController.buscarPTsFiltradas);
routes.get('/permissao_trabalho/:codigo_pt', PTController.lerPTEspecifica);
routes.get('/permissao_trabalho/profissional/:matricula', PTController.buscarPTsPorProfissional);


//Exporta o modulo de rotas para ser utilizado por outros módulos
module.exports = routes;