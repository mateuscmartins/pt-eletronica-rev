//
$(document).ready(()=>{

    //Blocos de conteúdo já iniciam ocultos por padrão
    //$(".bloco-conteudo").hide();

    //Função para acrecenter campos de funcionários no formulário
    const $botaoAcrescentaFuncionario = $('#acrescenta-funcionario');
    $botaoAcrescentaFuncionario.click(()=>{
        const novoFuncionario = '<div class="duas-colunas-profissionais"><div class="linha-conteudo"><h3>Matrícula: </h3><input type="text" name="matricula" placeholder="Matrícula do profissional" required></input> </div><div class="linha-conteudo"><h3>Nome: </h3><input  type="text" name="nome" placeholder="Nome do profissional" required></input></div></div>';
        $('#secao-profissionais').append(novoFuncionario);
    })




})