const connection = require('../services/connection');
const dataDeHoje = require('../services/dataAtual');
const { api } = require('../services/api');

class PermissaoDeTrabalho{


    async cadastrarPermissaoDeTrabalho(dadosPT){
        
        const codigo_pt =  await connection('permissao_trabalho').insert({
            ordem_servico: dadosPT.ordem_servico,
            emissor: "TROCAR",
            data_emissao: dataDeHoje,
        })

        return codigo_pt;
    }

    async listarTodasAsPermissoesDeTrabalho(){
        const listaDePermissoesDeTrabalho = await api.get('permissao_trabalho'); 
        return await (listaDePermissoesDeTrabalho.data);
    }
    
    async listarPermissaoDeTrabalhoFiltrada(dadosFiltro){
        const listaDePermissoesDeTrabalhoFiltrada = await api.post('permissao_trabalho/filtrada', dadosFiltro);
        return listaDePermissoesDeTrabalhoFiltrada.data
    }

    async buscarPermissaoDeTrabalhoEspecifica(codigoPT){
        const dadosDaPermissaoDeTrabalho = await api.get('permissao_trabalho/' + codigoPT);
        return dadosDaPermissaoDeTrabalho.data
    }

    async listarPermissaoDeTrabalhoPorProfissionalDeManutencao(matricula){
        const listaDePermissoesDeTrabalhoFiltradasPorProfissional = await api.get('permissao_trabalho/profissional/' + matricula);
        return listaDePermissoesDeTrabalhoFiltradasPorProfissional.data;
    }

    async listarPermissaoDeTrabalhoFiltradaPorProfissionalDeManutencao(dadosFiltro){
        const listaDePermissoesDeTrabalhoFiltrada = await api.post('permissao_trabalho/filtrada/manutencao', dadosFiltro);
        return listaDePermissoesDeTrabalhoFiltrada.data
    }
}

module.exports = PermissaoDeTrabalho;