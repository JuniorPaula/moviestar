/** 1 trazer o express */
const express = require('express');

/** 2- Faser o express usar o router */
const route = express.Router();

/** Importando o HomeControllers */
const IndexController = require('./controllers/IndexController');
const UserController = require('./controllers/UserController');

/** Rota da pagina inicial vinda do HomeControlers */
route.get('/', IndexController.index);

/** Rotas de autenticação */
route.get('/auth', UserController.index);
route.post('/auth/resgister', UserController.register);

/** exportando o route */
module.exports = route;
