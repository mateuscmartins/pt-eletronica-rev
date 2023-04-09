const novaPTView = (req, res)=>{
    res.render('nova-pt',{});
};


const listaPT = (req, res)=>{
    res.render('lista-pt', {})
}

module.exports = { novaPTView, listaPT };