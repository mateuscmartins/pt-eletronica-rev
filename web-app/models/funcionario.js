const connection = require('../services/connection');

class Funcionario{


    async cadastrarFuncionario(dadosPT, codigoPT){
        
        let listaDeFuncionarios = [];
            
        for(let i=0; i < dadosPT.matricula.length; i++){
            let funcionario = {codigo_pt: codigoPT, matricula: dadosPT.matricula[i]};
            listaDeFuncionarios.push(funcionario);        
        }
        
        await connection('funcionarios_pt').insert(listaDeFuncionarios);
    }
    
}

module.exports = Funcionario;