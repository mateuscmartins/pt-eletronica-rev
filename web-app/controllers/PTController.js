const Usuario = require('../models/usuario')
const OrdemServico = require('../models/ordemServico');
const PermissaoDeTrabalho = require('../models/permissaoTrabalho');
const Funcionario = require("../models/funcionario");
const Risco = require("../models/risco");
const Perigo = require("../models/perigo");
const Equipamento = require("../models/equipamento");
const MedidaPreventiva = require("../models/medidaPreventiva");


//Função que lida com a view de cadastramento da permissão de trabalho no banco de dados
const novaPTView = async (req, res)=>{
    

    const novoUsuario = new Usuario();
    const profissionais = await novoUsuario.listarTodosOsUsuarios();

    res.render('nova-pt',{listaDeProfissionais: profissionais});
};


//Função que lida com o cadastramento da permissão de trabalho no banco de dados
const registrarNovaPT = (req, res)=>{
    
    const dados = req.body;
    const matriculaDoProfissionalSST = req.session.userid;

    async function cadastrarOS(){
        const ordemDeServico = new OrdemServico;
        await ordemDeServico.cadastrarOrdemDeServico(dados);
    }

    async function cadastrarPT(){
        const permissaoDeTrabalho = new PermissaoDeTrabalho;
        let codigoPT = await permissaoDeTrabalho.cadastrarPermissaoDeTrabalho(dados, matriculaDoProfissionalSST);
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
   }).then((resultado) => {res.redirect("/lista-pt")});
        
}

//Função que lida com o envio da lista de permissões de trabalho do banco de dados
const listarPT = async (req, res)=>{
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const PTs = await permissaoDeTrabalho.listarTodasAsPermissoesDeTrabalho();
    res.render('lista-pt', {listaDePTs: PTs, usuario: req.session})
}


//Função que lida com a requisição de lista de PTs filtradas
const listarPTFiltradas = async(req, res) => {
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const PTsFiltradas = await permissaoDeTrabalho.listarPermissaoDeTrabalhoFiltrada(req.body);
    res.render('lista-pt', {listaDePTs: PTsFiltradas, usuario: req.session})
}

//Função que lida com a requisição pra visualizar apenas os dados de uma PT específica
const exibirPT = async (req, res)=>{
    const codDaPT = req.params.codigo_pt;
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const dadosDaPT = await permissaoDeTrabalho.buscarPermissaoDeTrabalhoEspecifica(codDaPT);
    res.render('exibir-pt', {dadosPermissaoDeTrabalho: dadosDaPT, usuario: req.session})
}

const listarPTPorProfissional = async(req, res)=>{
    const matriculaDoProfissional = req.session.userid;
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const PTsFiltradas = await permissaoDeTrabalho.listarPermissaoDeTrabalhoPorProfissionalDeManutencao(matriculaDoProfissional);
    res.render('lista-pt', {listaDePTs: PTsFiltradas, usuario: req.session})
}

const listarPTFiltradaPorProfissionalDeManutencao = async(req, res)=>{
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    const PTsFiltradas = await permissaoDeTrabalho.listarPermissaoDeTrabalhoFiltradaPorProfissionalDeManutencao(req.body);
    res.render('lista-pt', {listaDePTs: PTsFiltradas, usuario: req.session})
}

const assinarPT = async(req, res) => {
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    await permissaoDeTrabalho.assinarPermissaoDeTrabalhoProfissionalDeManutencao(req.body);
    res.redirect("/lista-pt/manutencao");
}

const concluirPT = async(req, res) => {
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    await permissaoDeTrabalho.concluirPermissaoDeTrabalhoProfissionalDeManutencao(req.body);
    res.redirect("/lista-pt/manutencao");
}

const cancelarPT = async(req, res) => {
    const permissaoDeTrabalho = new PermissaoDeTrabalho();
    await permissaoDeTrabalho.cancelarPermissaoDeTrabalhoProfissionalDeManutencao(req.body);
    res.redirect("/lista-pt");
}


module.exports = 
    { 
        novaPTView, 
        registrarNovaPT, 
        listarPT, 
        exibirPT, 
        listarPTFiltradas, 
        listarPTPorProfissional , 
        listarPTFiltradaPorProfissionalDeManutencao, 
        assinarPT,
        concluirPT,
        cancelarPT
    };