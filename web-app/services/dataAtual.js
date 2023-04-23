
let data = new Date();
let dia = String(data.getDate()).padStart(2, '0');
let mes = String(data.getMonth() + 1).padStart(2, '0');
let ano = data.getFullYear();
dataAtual = ano + '-' + mes + '-' + dia;


module.exports =  dataAtual;