/** importando o dotenv para configuração de variáveis
 * de ambiente no arquivo .env
 */
require('dotenv').config();

/** 1- impotando o express  */
const express = require('express');

/** 2- add express a variavel app */
const app = express();

/** 6- add mongoose para estaelecer conexao com a base de dados do mongoDB */
const mongoose = require('mongoose');

/** Passar a url de conexao atravez do 'dotenv' para o mongoose se conectar com a base de dados
 *  emitir um evento para o express saber a hora de estabelecer a conexao
 *  com o mongoDB.
*/
mongoose.connect(process.env.URL_CONNECTION)
  .then(() => {
    app.emit('ready');
  })
  .catch((e) => console.log(e));

/** 7- configurar as sessoes e flash messages atravez do:
 * connect-mongo e connect-flash
 */
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

/** 5- importando route */

/** importando o path */
const path = require('path');

/** importando o helmet */
const helmet = require('helmet');

/** importando csrf */
const csfr = require('csurf');
const routes = require('./routes');

/** importando o middleware */
const { middlewareGlobal, checkCsrfToken, csrfMiddleware } = require('./middlewares/middleware');

/** fazendo o express ultilizar o helmet */
app.use(helmet());

/** 4- atribuindo urlencoded para envio de formulario -> body da requisição;
 * se não for passado o body vem como 'undefined'.
 */
app.use(express.urlencoded({ extended: true }));

/** dizendo pro express fazer o parse de json */
app.use(express.json());

/** Fazendo o express ultilzar os arquivos estaticos atravez do caminho
 * relativo com o path
 */
app.use(express.static(path.resolve(__dirname, '..', 'public')));

/** Configura as sessoes */
const sessionOptions = session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
  store: MongoStore.create({ mongoUrl: process.env.URL_CONNECTION }),
});
/** fazer o express execultar o sessiosOptions e o flash */
app.use(sessionOptions);
app.use(flash());

/** Fazendo o express ultilizar o csurf */
app.use(csfr());

/** Fazendo o express ultilizar o middleware,
 * o middleware tem sempre que ficar em cima da rota, senão,
 * o express le primeiro a rota e depois o middleware;
 */
app.use(middlewareGlobal);
app.use(checkCsrfToken);
app.use(csrfMiddleware);

/** Fasendo o express ultilizar o routes,
 * sempre abaixo dos MIDDLEWARES/SESSIONS/FLASH MENSAGES;
 */
app.use(routes);

/** Fasendo o express ultilizar as view atravez do caminho relativo
 * com o path
 */
app.set('views', path.resolve(__dirname, 'views'));

/** Fazendo o express setar a views engine do EJS */
app.set('view engine', 'ejs');

/**
 * PARAMENTROS
 * req.body -> recebe o corpo da reqisisao vindo do formulario;
 * req.params -> recebe chave/valor vindo dos paramentros da url;
 * res.send -> deveolve o valor na tela para o usuario;
 * res.render -> renderiza o que foi pedido;
 */

/** porta de conexão */
const port = process.env.PORT;

/** Receber o evento emitido pra estabeler a conexao com a base de dados */
app.on('ready', () => {
  /** 3- instancia o servidor */
  app.listen(port, () => {
    console.log(`CTRL + Click: http://localhost:${port}`);
    console.log(`started on ready port: ${port}`);
  });
});
