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

  /** método estático responsável por buscar todos
     *  os usuários e listar na view */
  static async getUsers(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  /** método responsável por atualizar a senha do usuário */
  async passwordUpdate(id) {
    if (typeof id !== 'string') return;

    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('senha precisar ter mas que 3 caracteres.');
    }

    if (this.body.password !== this.body.confirmPassword) {
      this.errors.push('Senhas precisam ser iguais.');
      return;
    }

    /** criar um hash da senha com bcrytjs */
    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);
    this.body.confirmPassword = bcrypt.hashSync(this.body.confirmPassword, salt);

    if (this.errors.length > 0) return;
    this.user = await UserModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  /** método responsável por atualizar um usuário */
  async update(id) {
    if (typeof id !== 'string') return;
    this.clearUp();

    if (this.body.name === '') this.errors.push('O nome não pode está vazio.');
    if (this.body.lastname === '') this.errors.push('O Sobrenome não pode está vazio.');

    if (this.errors.length > 0) return;
    this.user = await UserModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  /** método responsável por logar o usuário */
  async login() {
    if (this.errors.length > 0) return;
    this.user = await UserModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuário inválido!');
      return;
    }

    if (!bcrypt.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
    }
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
