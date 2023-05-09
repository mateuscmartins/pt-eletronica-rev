const Usuario = require('../models/usuario')

//Função que busca lista de usuários no banco de dados e envia para a view
const listaUsuarios = async (req, res)=>{
    const novoUsuario = new Usuario();
    const lista = await novoUsuario.listarTodosOsUsuarios();
    const listaFuncoes = await novoUsuario.listarFuncoes();
    res.render('lista-usuarios',{listaDeUsuarios: lista, usuario: req.session.userprofile, teste:"teste", listaDeFuncoes: listaFuncoes});
};

const exibirUsuario = async (req, res)=>{
        
    const matriculaDoFuncionario = req.params.matricula;
    const usuario = new Usuario();
    const dadosDoFuncionario = await usuario.exibirUsuarioEspecifico(matriculaDoFuncionario);

    res.render('usuario',{dadosUsuario: dadosDoFuncionario});
};

const criarUsuario = (req, res)=>{
    res.render('novo-usuario', {})
}

//Função que realiza o cadastramento do usuário no banco de dados
const registrarUsuario = async (req, res)=>{
    const novoUsuario = new Usuario();
    await novoUsuario.cadastrarUsuario(req.body);
    res.redirect("/lista-usuarios");
}

//Função que lida com a requisição de lista de usuários filtrados
const listarUsuariosFiltrados = async(req, res) => {
    const usuario = new Usuario();
    const usuariosFiltrados = await usuario.listarUsuariosFiltrados(req.body);
    const listaFuncoes = await usuario.listarFuncoes();
    res.render('lista-usuarios', {listaDeUsuarios: usuariosFiltrados, usuario: req.session.userprofile, listaDeFuncoes: listaFuncoes})
}

module.exports = { listaUsuarios, exibirUsuario, criarUsuario, registrarUsuario, listarUsuariosFiltrados};