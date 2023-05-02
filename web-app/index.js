//Importação dos módulos necessários par funcionamento do web app
//  express - framework web
//  bodyParser - conversão do corpo do http para JSON
//  path - utilizar o caminho do sistema de arquivos correto
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session')

//Importação dos métodos do controller de login
//  loginView - Tela de login
//  loginSessao - Sistema de validação do login
const { loginView, loginSessao } = require('./controllers/loginController');

//Importação dos métodos do controller de emissão de PT
//  novaPTView - Tela do formulário
//  registrarNovaPT - Rota que realiza o cadastro de uma nova PT no banco de dados 
//  listaPT - Tela que exibe todas as PTs cadastradas no banco de dados
//  exibirPT - Tela que exibe dados de uma PT cadastradas no sistema
const { novaPTView, registrarNovaPT, listarPT, exibirPT, listarPTFiltradas } = require('./controllers/PTController');


//Importação dos métodos do controller de emissão de PT
//  listaUsuarios - Tela que exibe a lista dos usuários cadastrados no sistema
//  exibirUsuario - Tela que exibe dados de um usuário cadastrado no sistema
//  criarUsuario - Tela que permite a criação de novo usuário no sistema
// registrarUsuario - Rota que realiza o cadastro de usuário no banco de dados
const { listaUsuarios, exibirUsuario, criarUsuario, registrarUsuario, listarUsuariosFiltrados } = require('./controllers/usuariosController');

//Instanciação do express
const app = express();

//Parametrização do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Parametrizando o middleware de sessão do express
app.use(session({
    secret: 'pteletronica',
    saveUninitialized: false,
    resave: false
}));

//Parametrização do tameplate engine utilizando o EJS com ferramenta
app.set('view engine', 'ejs');
app.set('views', './views');

//Parametrização do caminho para a utilização arquivos estáticos
//  Utilizado para o EJS importar os arquivos CSS e JS
app.use(express.static(path.join(__dirname, '/public')));

//Definição das rotas da tela inicial
//  GET - Carrega a página simples de login
//  POST - Realiza verificação do usuário e senha para login
app.get("/", loginView);
app.post("/", loginSessao);

//Definição das rotas da tela de formulário de emissão de PT
//  GET - Carrega a página do formulário de emissão de PT
//  POST - criarNovaPT - rota para realizar a comunicação do sistema com a API
app.get("/nova-pt", novaPTView);
app.post("/nova-pt", registrarNovaPT);



//Definição da rota da tela que exibe PTs registradas no banco de dados
//  GET - Página com todas as PTs cadastradas no banco de dados
//  POST - Página com as PTs filtradas conforme critérios do usuário
app.get("/lista-pt", listarPT);
app.post('/lista-pt', listarPTFiltradas)


//Definição da rota da tela que exibe uma PT registrada no banco de dados
app.get("/exibir-pt/:codigo_pt", exibirPT)


//Definição das rotas das telsa que tratam da administração dos usuários do sistema
//  GET - lista-usuarios - exibe todos os usuários cadastrados no sistema
//  POST - lista-usuario - exibe os usuarios conforme critérios de filtro do usuario
//  GET - exibir-usuario - exibe usuário específico cadastrado no sistema para edição
//  GET - criarUsuario - rota para cadastrar novo usuário no sistema
//  POST - registrarUsuario - rota para realizar a comunicação do sistema com a API
app.get("/lista-usuarios", listaUsuarios);
app.post('/lista-usuarios', listarUsuariosFiltrados)
app.get("/exibir-usuario", exibirUsuario);
app.get("/novo-usuario", criarUsuario);
app.post("/novo-usuario", registrarUsuario);

app.listen(3000, ()=>{
    console.log("Servidor da web app rodando na porta 3000");
})