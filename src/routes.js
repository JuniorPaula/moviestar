/** 1 trazer o express */
const express = require('express');

/** 2- Faser o express usar o router */
const route = express.Router();

/** Importando o HomeControllers */
const IndexController = require('./controllers/IndexController');

/** Rota da pagina inicial vinda do HomeControlers */
route.get('/', IndexController.index);

/** exportando o route */
module.exports = route;
