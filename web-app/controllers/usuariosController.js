const Usuario = require('../models/usuario')

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


const registrarUsuario = async (req, res)=>{
    const novoUsuario = new Usuario();
    await novoUsuario.cadastrarUsuario(req.body);
    res.redirect("/lista-usuarios");
}

module.exports = { listaUsuarios, exibirUsuario, criarUsuario, registrarUsuario};