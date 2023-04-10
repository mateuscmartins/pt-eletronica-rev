const novaPTView = (req, res)=>{
    res.render('nova-pt',{});
};

const listaPT = (req, res)=>{
    res.render('lista-pt', {})
}

const exibirPT = (req, res)=>{
    res.render('exibir-pt')
}

module.exports = { novaPTView, listaPT, exibirPT };