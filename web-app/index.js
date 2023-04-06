const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { loginView, loginSessao } = require('./controllers/loginController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.static(path.join(__dirname, '/public')));


app.get("/", loginView);
app.post("/", loginSessao);


app.listen(3000, ()=>{
    console.log("Servidor da web app rodando na porta 3000");
})