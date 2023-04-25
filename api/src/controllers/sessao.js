//Importando o módulo de conexão com o banco de dados de desenvolvimento
const connection = require('../db/connection');

module.exports = {

    async criar(req, res) {
        //Armazenando os dados enviados pela requisção POST
        const { matricula, senha } = req.body;
    
        //Armazenando dados no banco de dados na tabela usuarios
        const sessao = await connection('usuarios')
            .select(
                "matricula",
                "nome",
                "perfil")
            .where({
                "matricula": matricula,
                "senha": senha
            })
            .first();
    
        if(!sessao){
            return res.status(400).json({ error: 'usuário não encontrado'});
        }

        return res.json(sessao);
    }

}