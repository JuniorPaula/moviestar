const FotoUser = require('../models/FotoUser');

exports.create = async (req, res) => {
  try {
    const userFoto = new FotoUser(req.file);
    const userID = req.session.user._id;
    console.log(userID);
    await userFoto.upload(userID);

    return res.redirect('/home');
  } catch (e) {
    console.log(e);
  }
};
