//Importação dos módulos necessários par funcionamento do web app
//  express - framework web
//  bodyParser - conversão do corpo do http para JSON
//  path - utilizar o caminho do sistema de arquivos correto
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//Importação dos métodos do controller de login
//  loginView - Tela de login
//  loginSessao - Sistema de validação do login
const { loginView, loginSessao } = require('./controllers/loginController');

//Importação dos métodos do controller de emissão de PT
//  novaPTView - Tela do formulário
//  listaPT - Tela que exibe todas as PTs cadastradas no banco de dados
const { novaPTView, listaPT, exibirPT } = require('./controllers/PT');


//Instanciação do express
const app = express();

//Parametrização do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Parametrização do tameplate engine utilizando o EJS com ferramenta
app.set('view engine', 'ejs');
app.set('views', './views')

//Parametrização do caminho para a utilização arquivos estáticos
//  Utilizado para o EJS importar os arquivos CSS e JS
app.use(express.static(path.join(__dirname, '/public')));

//Definição das rotas da tela inicial
// GET - Carrega a página simples de login
//  POST - Realiza verificação do usuário e senha para login
app.get("/", loginView);
app.post("/", loginSessao);

//Definição das rotas da tela de formulário de emissão de PT
// GET - Carrega a página do formulário de emissão de PT
app.get("/nova-pt", novaPTView);



//Definição da rota da tela que exibe PTs registradas no banco de dados
app.get("/lista-pt", listaPT);

//Definição da rota da tela que exibe uma PT registrada no banco de dado
app.get("/exibir-pt", exibirPT)

app.listen(3000, ()=>{
    console.log("Servidor da web app rodando na porta 3000");
})