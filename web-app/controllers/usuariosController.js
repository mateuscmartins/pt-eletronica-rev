const Usuario = require('../models/usuario')

const listaUsuarios = (req, res)=>{
    res.render('lista-usuarios',{});
};

const exibirUsuario = (req, res)=>{
    res.render('usuario',{});
};

const criarUsuario = (req, res)=>{
    res.render('novo-usuario', {})
}


const registrarUsuario = (req, res)=>{
    const novoUsuario = new Usuario();
    novoUsuario.cadastrarUsuario(req.body);
}

module.exports = { listaUsuarios, exibirUsuario, criarUsuario, registrarUsuario};