/** 1 trazer o express */
const express = require('express');

/** 2- Faser o express usar o router */
const route = express.Router();

/** importar o multer */
// const multer = require('multer');
// const userMulter = require('./config/userMulter');

/** Importando os Controllers */
const IndexController = require('./controllers/IndexController');
const UserController = require('./controllers/UserController');
const HomeController = require('./controllers/HomeController');

/** Impotar os middleware */
const { loginRequired } = require('./middlewares/middleware');

/** Rota da pagina inicial vinda do HomeControlers */
route.get('/', IndexController.index);

/** Rotas de autenticação */
route.get('/auth', UserController.index);
route.get('/auth/logout', UserController.logout);
route.post('/auth/resgister', UserController.register);
route.post('/auth/login', UserController.login);

/** Rotas home de usuários */
route.get('/home', loginRequired, HomeController.index);
route.post('/home/edit/:id', loginRequired, HomeController.update);

/** exportando o route */
module.exports = route;
