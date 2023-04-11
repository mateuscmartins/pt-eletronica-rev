const listaUsuarios = (req, res)=>{
    res.render('lista-usuarios',{});
};

const exibirUsuario = (req, res)=>{
    res.render('usuario',{});
};

module.exports = { listaUsuarios, exibirUsuario };