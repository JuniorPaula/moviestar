const multer = require('multer');
const path = require('path');

const rand = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new multer.MulterError('Arquivo precisar ser PNG ou JPG'));
    }

    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'public', 'img', 'user'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${rand()}${path.extname(file.originalname)}`);
    },
  }),
};
