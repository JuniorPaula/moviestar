/** importar o mongoose */
const mongoose = require('mongoose');

/** criar Schema: mongoose schema para modelar os dados */
const HomeSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: String
});

/** criar model: para exportar o schema
 *  nome do model: Home;
 *  nome do schema: HomeSchema;
 */

const HomeModel = mongoose.model('Home', HomeSchema);

/** Criar class que vai tratar da regra de negocio */
class Home {

}

module.exports = Home;