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
    
        req.session.userid = resultado.data.matricula;
        req.session.user = resultado.data.nome;
        req.session.userprofile = resultado.data.perfil;
        
        if(req.session.userprofile === 'adm'){
            res.redirect('/lista-usuarios')
        };

        if(req.session.userprofile === 'fiscal'){
            res.redirect('/lista-pt');
        };

        if(req.session.userprofile === 'tecnico-manutencao' || req.session.userprofile === 'encarregado-manutencao'){
            res.redirect('/lista-pt/manutencao');
        };

        if(req.session.userprofile === 'seguranca-trabalho'){
            res.redirect('/lista-pt');
        };
        
    })
    .catch((error)=>{
        //console.log(error.response.data)
        res.render('login', {erro: error.response.data})
    });


}


module.exports = { loginView, loginSessao };