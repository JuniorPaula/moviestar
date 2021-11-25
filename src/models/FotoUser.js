/** importa o mongoose */
const mongoose = require('mongoose');

const FotoUserSchema = new mongoose.Schema({
  name: { type: String },
  size: { type: Number },
  key: { type: String },
  url: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const FotoUserModel = mongoose.model('FotoUser', FotoUserSchema);

class FotoUser {
  constructor(file) {
    this.file = file;
    this.errors = [];
  }

  /** método responsável por recuperar a foto do usuário no banco */
  static async getFotoByUserId(id) {
    if (!id) return;
    const fotoProfile = await FotoUserModel.findOne({ user: id })
      .sort({ created_at: -1 });
    return fotoProfile || null;
  }

  /** método responsável por slavar foto no banco */
  async upload(userID) {
    const { originalname: name, size, filename: key } = this.file;

    await FotoUserModel.create({
      name,
      size,
      key,
      user: userID,
    });
  }
}

module.exports = FotoUser;
