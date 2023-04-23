const OrdemServico = require('../models/ordemServico');
const PermissaoDeTrabalho = require('../models/permissaoTrabalho');
const Risco = require("../models/risco");
const Perigo = require("../models/perigo");

const novaPTView = (req, res)=>{
    res.render('nova-pt',{});
};

const registrarNovaPT = (req, res)=>{
    
    const dados = req.body;

    async function cadastrarOS(){
        const ordemDeServico = new OrdemServico;
        await ordemDeServico.cadastrarOrdemDeServico(dados);
    }

    async function cadastrarPT(){
        const permissaoDeTrabalho = new PermissaoDeTrabalho;
        let codigoPT = await permissaoDeTrabalho.cadastrarPermissaoDeTrabalho(dados);
        return codigoPT;
    }

    function cadastrarRisco(codigoPT){
        const riscoDaPermissaoDeTrabalho = new Risco;
        riscoDaPermissaoDeTrabalho.cadastrarRisco(dados, codigoPT);
    }

    function cadastrarPerigo(codigoPT){
        const perigoDaPermissaoDeTrabalho = new Perigo;
        perigoDaPermissaoDeTrabalho.cadastrarPerigo(dados, codigoPT);
    }

   cadastrarOS();
   cadastrarPT().then((resultado) => {
    cadastrarRisco(resultado[0]);
    cadastrarPerigo(resultado[0]);
   });   
        
}

const listaPT = (req, res)=>{
    res.render('lista-pt', {})
}

const exibirPT = (req, res)=>{
    res.render('exibir-pt')
}

module.exports = { novaPTView, registrarNovaPT, listaPT, exibirPT };