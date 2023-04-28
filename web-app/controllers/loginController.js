const  Sessao  = require('../models/sessao');

const loginView = (req, res)=>{
    res.render('login',{erro: false});
};


const loginSessao = (req, res)=>{
    
    const { matricula, senha } = req.body;
    const novaSessao = new Sessao;

    const resultadoLogin = novaSessao.iniciarSessao({ matricula, senha });
    resultadoLogin
    .then((resultado)=>{
        console.log(resultado);
        req.session.userid = resultado.data.matricula;
        req.session.user = resultado.data.nome;
        req.session.userprofile = resultado.data.perfil;
        console.log(req.session)
        if(req.session.userprofile === 'adm'){
            res.render('lista-usuarios', {sessao: req.session})
        };

        if(req.session.userprofile === 'fiscal'){
            res.redirect('/lista-pt');
        };
        
    })
    .catch((error)=>{
        //console.log(error.response.data)
        res.render('login', {erro: error.response.data})
    });


}


module.exports = { loginView, loginSessao };