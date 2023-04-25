const OrdemServico = require('../models/ordemServico');
const PermissaoDeTrabalho = require('../models/permissaoTrabalho');
const Funcionario = require("../models/funcionario");
const Risco = require("../models/risco");
const Perigo = require("../models/perigo");
const Equipamento = require("../models/equipamento");
const MedidaPreventiva = require("../models/medidaPreventiva");


//Função que lida com a view de cadastramento da permissão de trabalho no banco de dados
const novaPTView = (req, res)=>{
    res.render('nova-pt',{});
};


//Função que lida com o cadastramento da permissão de trabalho no banco de dados
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

    function cadastrarFuncionario(codigoPT){
        const funcionarioDaPermissaoDeTrabalho = new Funcionario;
        funcionarioDaPermissaoDeTrabalho.cadastrarFuncionario(dados, codigoPT);
    }

    function cadastrarRisco(codigoPT){
        const riscoDaPermissaoDeTrabalho = new Risco;
        riscoDaPermissaoDeTrabalho.cadastrarRisco(dados, codigoPT);
    }

    function cadastrarPerigo(codigoPT){
        const perigoDaPermissaoDeTrabalho = new Perigo;
        perigoDaPermissaoDeTrabalho.cadastrarPerigo(dados, codigoPT);
    }

    function cadastrarEquipamento(codigoPT){
        const equipamentoDaPermissaoDeTrabalho = new Equipamento;
        equipamentoDaPermissaoDeTrabalho.cadastrarEquipamento(dados, codigoPT);
    }

    function cadastrarMedidaPreventiva(codigoPT){
        const medidaPreventivaDaPermissaoDeTrabalho = new MedidaPreventiva;
        medidaPreventivaDaPermissaoDeTrabalho.cadastrarMedidaPreventiva(dados, codigoPT);
    }

   cadastrarOS();
   cadastrarPT().then((resultado) => {
    cadastrarFuncionario(resultado[0]);
    cadastrarRisco(resultado[0]);
    cadastrarPerigo(resultado[0]);
    cadastrarEquipamento(resultado[0]);
    cadastrarMedidaPreventiva(resultado[0])
   });   
        
}

//Função que lida com o envio da lista de permissões de trabalho do banco de dados
const listarPT = async (req, res)=>{
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const PTs = await permissaoDeTrabalho.listarTodasAsPermissoesDeTrabalho();
    res.render('lista-pt', {listaDePTs: PTs})
}


const exibirPT = (req, res)=>{
    res.render('exibir-pt')
}

module.exports = { novaPTView, registrarNovaPT, listarPT, exibirPT };