const MovieModel = require('../models/MovieModel');

exports.index = async (req, res) => {
  try {
    const userID = req.session.user._id;
    const movies = await MovieModel.getMovieByUserId(userID);

    res.render('dashboard', { movies });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.findMovie = async (req, res) => {
  try {
    const userLoggeded = req.session.user;
    const movieId = req.query.id;
    const movie = await MovieModel.getMovieById(movieId);

    /** verificar se o filme é do usuário */
    let ownMovie = false;
    if (userLoggeded._id === movie.userId) {
      ownMovie = true;
    }

    /** renderizar a view */
    res.render('movie', { movie, userLoggeded, ownMovie });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

/** método responsável por renderizar a view de edição de filme */
exports.showMovie = async (req, res) => {
  try {
    const movieId = req.query.id;
    const movie = await MovieModel.getMovieById(movieId);

    /** renderozar a view */
    return res.render('editMovie', { movie });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};

exports.delete = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!movieId) return;

    const userLoggeded = req.session.user._id;

    if (!userLoggeded) {
      req.flash('errors', 'Erro ao deletar o filme');
      req.session.save(() => res.redirect('/dashboard'));
      return;
    }

    /** deletar o filme */
    await MovieModel.deleteMovie(movieId);

    req.flash('success', 'Filme detetado com sucesso!');
    return req.session.save(() => res.redirect('/dashboard'));
  } catch (e) {
    console.log(e);
  }
};
