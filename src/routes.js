/** 1 trazer o express */
const express = require('express');
// const path = require('path');

/** 2- Faser o express usar o router */
const route = express.Router();

/** importar o multer */
const multer = require('multer');
const userMulter = require('./config/userMulter');

const upload = multer(userMulter);

/** Importando os Controllers */
const IndexController = require('./controllers/IndexController');
const UserController = require('./controllers/UserController');
const HomeController = require('./controllers/HomeController');
const FotoController = require('./controllers/FotoController');

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
route.post('/home/passwdedit/:id', loginRequired, HomeController.passwordUpdate);

/** Rotas de imagens */
route.post('/foto/user', loginRequired, upload.single('image'), FotoController.create);

/** exportando o route */
module.exports = route;
