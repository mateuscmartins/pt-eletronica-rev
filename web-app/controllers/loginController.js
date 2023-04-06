const loginView = (req, res)=>{
    res.render('login',{});
};


const loginSessao = (req, res)=>{
    const { usuario, senha } = req.body;
    console.log(usuario, senha);
}


module.exports = { loginView, loginSessao };