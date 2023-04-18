$(document).ready(function() {
    $('#tabela').DataTable({
      searching: false,
      ordering:  true,
      "paging": true,
      "info": true, //determina a exibição de quantos itens aparecem
      "dom": '<<t>ilp>', //determina posição dos elementos
      language: {
        url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/pt-BR.json'
      }
    });
  });