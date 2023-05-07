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

    //Função para acrecenter campos de funcionários no formulário
    const $botaoAcrescentaFuncionario = $('#acrescenta-funcionario');
    $botaoAcrescentaFuncionario.click(()=>{
        const novoFuncionario = '<div class="duas-colunas-profissionais"><div class="linha-conteudo"><h3>Matrícula: </h3><input type="text" name="matricula" placeholder="Matrícula do profissional" class="matricula" required></input> </div><div class="linha-conteudo"><h3>Nome: </h3><input  type="text" name="nome" placeholder="Nome do profissional" class="nome-profissional" readonly></input></div></div>';
        $('#secao-profissionais').append(novoFuncionario);
    })

    $(document).on('blur', '.matricula', function() {
        // busca o objeto correspondente à matrícula digitada
        var matriculaDigitada = $(this).val();
        var funcionarioEncontrado = funcionarios.find(function(funcionario) {
          return funcionario.matricula === matriculaDigitada;
        });
        // se encontrar um funcionario, preenche o campo de nome com o valor correspondente
        if (funcionarioEncontrado) {
            $(this).parent().next('.linha-conteudo').find('.nome-profissional').val(funcionarioEncontrado.nome);
            $(this).parent().next('.linha-conteudo').find('.nome-profissional').css('border-color', 'black');
            $(this).css('border-color', 'black');
        } else {
          // se não encontrar, limpa o campo de nome
          $(this).parent().next('.linha-conteudo').find('.nome-profissional').val('Profissional não encontrado');
          $(this).parent().next('.linha-conteudo').find('.nome-profissional').css('border-color', 'red');
          $(this).css('border-color', 'red');
          $(this).val('');
        }
      });

})

