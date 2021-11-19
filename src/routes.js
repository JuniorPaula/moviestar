/** 1 trazer o express */
const express = require('express');

/** 2- Faser o express usar o router */
const route = express.Router();

/** Importando os Controllers */
const IndexController = require('./controllers/IndexController');
const UserController = require('./controllers/UserController');
const HomeController = require('./controllers/HomeController');

/** Rota da pagina inicial vinda do HomeControlers */
route.get('/', IndexController.index);

/** Rotas de autenticação */
route.get('/auth', UserController.index);
route.post('/auth/resgister', UserController.register);
route.post('/auth/login', UserController.login);

/** Rotas home de usuários */
route.get('/home', HomeController.index);

/** exportando o route */
module.exports = route;
