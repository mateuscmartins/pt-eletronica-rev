//
$(document).ready(()=>{

    //Blocos de conteúdo já iniciam ocultos por padrão
    $(".bloco-conteudo").hide();

    $('#botao-titulo-OS').click(()=>{
        $("#conteudo-ordem-servico").toggle();
    })

    $('#botao-titulo-profissionais').click(()=>{
        $("#conteudo-profissionais").toggle();
    })

    $('#botao-titulo-riscos').click(()=>{
        $("#conteudo-riscos").toggle();
    })

    $('#botao-titulo-perigos').click(()=>{
        $("#conteudo-perigos").toggle();
    })

    $('#botao-titulo-equipamentos').click(()=>{
        $("#conteudo-equipamentos").toggle();
    })

    $('#botao-titulo-medidas').click(()=>{
        $("#conteudo-medidas").toggle();
    })

    /** 
    const botaoProfissionais = 
    const botaoRiscos =
    const botaoPerigos =
    const botaoEquipamentos =
    const botaoMedidas =
    */

    //Função para acrecenter campos de funcionários no formulário
    const $botaoAcrescentaFuncionario = $('#acrescenta-funcionario');
    $botaoAcrescentaFuncionario.click(()=>{
        const novoFuncionario = '<div class="duas-colunas-profissionais"><div class="linha-conteudo"><h3>Matrícula: </h3><input type="text" name="matricula" placeholder="Matrícula do profissional" required></input> </div><div class="linha-conteudo"><h3>Nome: </h3><input  type="text" name="nome" placeholder="Nome do profissional" required></input></div></div>';
        $('#secao-profissionais').append(novoFuncionario);
    })

})