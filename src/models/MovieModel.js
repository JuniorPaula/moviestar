/** importa o mongoose */
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  length: { type: String },
  category: { type: String, required: true },
  trailer: { type: String },
  description: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Movie = mongoose.model('MovieModel', MovieSchema);

class MovieModel {
  constructor(body, file) {
    this.body = body;
    this.file = file;
    this.errors = [];
  }

  /** método responsável por adicionar um filme */
  async register(id) {
    this.valid();

    if (this.errors.length > 0) return;

    await Movie.create({
      title: this.body.title,
      image: this.file.filename,
      length: this.body.length,
      category: this.body.category,
      trailer: this.body.trailer,
      description: this.body.description,
      userId: id,
    });
  }

  /** método responsável por validar os dados */
  valid() {
    this.clearUp();

    if (this.body.title === '') this.errors.push('O título precisa ser preenchido.');
    if (this.body.category === '') this.errors.push('Selecione uma categoria.');
    if (this.body.description === '') this.errors.push('Adicione uma descrição.');
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
      title: this.body.title,
      image: this.file.filename,
      length: this.body.length,
      category: this.body.category,
      trailer: this.body.trailer,
      description: this.body.description,
    };
  }
}

module.exports = MovieModel;
