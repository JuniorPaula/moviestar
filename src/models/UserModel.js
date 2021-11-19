/** importar o mongoose */
const mongoose = require('mongoose');

const validator = require('validator');
const bcrypt = require('bcryptjs');

/** criar Schema: mongoose schema para modelar os dados */
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  image: { type: String, required: false },
  bio: { type: String, required: false },
});

/** criar model: para exportar o schema
 *  nome do model: User;
 *  nome do schema: UserSchema;
 */

const UserModel = mongoose.model('User', UserSchema);

/** Criar class que vai tratar da regra de negocio */
class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  /** método responsável por resgistrar o usuário */
  async register() {
    this.valid();
    if (this.errors.length > 0) return;

    await this.userExist();
    if (this.errors.length > 0) return;

    /** criar um hash da senha com bcrytjs */
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    this.body.confirmPassword = bcrypt.hashSync(this.body.confirmPassword, salt);

    /** registrar o usuário */
    this.user = await UserModel.create(this.body);
  }

  /** método responsável por verificar se o usuário ja existe */
  async userExist() {
    const user = await UserModel.findOne({ email: this.body.email });

    if (user) this.errors.push('Usuário já existe.');
  }

  /** método responsável por validar os dados */
  valid() {
    this.clearUp();

    if (this.body.name === '') this.errors.push('O nome não pode está vazio.');
    if (!validator.isEmail(this.body.email)) this.errors.push('Email inválido.');
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('senha precisar ter mas que 3 caracteres.');
    }

    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push('Senhas precisam ser iguais.');
    }
  }

  /** método resposável por verificar se o que está vindo do formulário
   * é uma string
   */
  clearUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      lastname: this.body.lastname,
      email: this.body.email,
      password: this.body.password,
      confirmPassword: this.body.confirmPassword,
      image: this.body.image,
      bio: this.body.bio,
    };
  }
}

module.exports = User;
