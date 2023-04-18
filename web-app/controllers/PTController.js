const novaPTView = (req, res)=>{
    res.render('nova-pt',{});
};

const registrarNovaPT = (req, res)=>{
    console.log(req.body);
}

const listaPT = (req, res)=>{
    res.render('lista-pt', {})
}

const exibirPT = (req, res)=>{
    res.render('exibir-pt')
}

module.exports = { novaPTView, registrarNovaPT, listaPT, exibirPT };