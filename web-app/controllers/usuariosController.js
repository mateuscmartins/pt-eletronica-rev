const Usuario = require('../models/usuario')

//Função que busca lista de usuários no banco de dados e envia para a view
const listaUsuarios = async (req, res)=>{
    const novoUsuario = new Usuario();
    const lista = await novoUsuario.listarTodosOsUsuarios();
    res.render('lista-usuarios',{listaDeUsuarios: lista});
};

const exibirUsuario = (req, res)=>{    
    res.render('usuario',{});
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

module.exports = { listaUsuarios, exibirUsuario, criarUsuario, registrarUsuario};