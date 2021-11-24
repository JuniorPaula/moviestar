const User = require('../models/UserModel');
const FotoUser = require('../models/FotoUser');
const MovieModel = require('../models/MovieModel');

exports.index = async (req, res) => {
  try {
    let userId = null;

    if (!req.query.id) {
      userId = req.session.user._id;
    } else {
      userId = req.query.id;
    }

    /** buscar um usuário */
    const user = await User.getUsers(userId);
    const image = await FotoUser.getFotoByUserId(req.session.user._id);

    /** buscar fimes do usuário */
    const movies = await MovieModel.getMovieByUserId(userId);

    res.render('profile', { user, image, movies });
  } catch (e) {
    console.log(e);
    req.flash('errors', 'Você precisa estar logado!');
    req.session.save(() => res.redirect('/'));
  }
};
