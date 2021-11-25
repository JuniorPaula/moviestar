/** 1 trazer o express */
const express = require('express');
// const path = require('path');

/** 2- Faser o express usar o router */
const route = express.Router();

/** importar o multer */
const multer = require('multer');
const userMulter = require('./config/userMulter');
const movieMulter = require('./config/movieMulter');

const upload = multer(userMulter);
const movieUpload = multer(movieMulter);

/** Importando os Controllers */
const IndexController = require('./controllers/IndexController');
const UserController = require('./controllers/UserController');
const HomeController = require('./controllers/HomeController');
const FotoController = require('./controllers/FotoController');
const MovieController = require('./controllers/MovieController');
const DashboardController = require('./controllers/DashboardController');
const ProfileController = require('./controllers/ProfileController');
const ReviewControler = require('./controllers/ReviewControler');

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

/** Rotas de filmes */
route.get('/newmovie', loginRequired, MovieController.index);
route.post('/newmovie', loginRequired, movieUpload.single('image'), MovieController.create);

/** Rotas da dashboard */
route.get('/dashboard', loginRequired, DashboardController.index);
route.post('/delete/:id', loginRequired, DashboardController.delete);
route.post('/dashboard/edit', loginRequired, movieUpload.single('image'), DashboardController.update);
route.get('/movie', DashboardController.findMovie);
route.get('/edit', loginRequired, DashboardController.showMovie);

/** rotas de perfil */
route.get('/profile', loginRequired, ProfileController.index);

/** rotas de reviews */
route.post('/reviews/:id', loginRequired, ReviewControler.create);

/** exportando o route */
module.exports = route;
