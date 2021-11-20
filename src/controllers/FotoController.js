const FotoUser = require('../models/FotoUser');

exports.create = async (req, res) => {
  try {
    const userFoto = new FotoUser(req.file);
    const userID = req.session.user._id;

    await userFoto.upload(userID);

    if (userFoto.errors.length > 0) {
      req.flash('errors', userFoto.errors);
      req.session.save(() => res.redirect('/home'));
    }

    req.flash('success', 'Foto alterada com sucesso!');
    req.session.save(() => res.redirect('/home'));
  } catch (e) {
    console.log(e);
  }
};
