const { buscarUsuario } = require('../models/login');

const loginView = (req, res)=>{
    res.render('login',{});
};


const loginSessao = (req, res)=>{
    const { matricula, senha } = req.body;
    const usuarioSessao = buscarUsuario(matricula);

    if(usuarioSessao.matricula === matricula && usuarioSessao.senha === senha){
        res.send(usuarioSessao);
    }else{
        res.send({mensagem: "Usuário inexistente ou senha errada."})
    }
}


module.exports = { loginView, loginSessao };