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
});

const FotoUserModel = mongoose.model('FotoUser', FotoUserSchema);

class FotoUser {
  constructor(file) {
    this.file = file;
  }

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
