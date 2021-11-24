const MovieModel = require('../models/MovieModel');
const ReviewModel = require('../models/ReviewModel');

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

    /** recuperar as reviews */
    const reviews = await ReviewModel.getReviewMovieById(movieId);

    /** renderizar a view */
    res.render('movie', {
      movie, userLoggeded, reviews,
    });
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

exports.update = async (req, res) => {
  try {
    const { movieId } = req.body;
    let image = null;

    const imageDatabase = await MovieModel.getMovieById(movieId);

    if (req.file === undefined) {
      image = imageDatabase.image;
    } else {
      image = req.file.filename;
    }

    const movieUpdated = new MovieModel(req.body, image);
    await movieUpdated.update(movieId);

    if (movieUpdated.errors.length > 0) {
      req.flash('errors', movieUpdated.errors);
      req.session.save(() => res.redirect(`/edit?id=${movieId}`));
      return;
    }

    req.flash('success', 'Filme atualizado com sucesso!');
    return req.session.save(() => res.redirect(`/edit?id=${movieId}`));
  } catch (e) {
    console.log(e);
  }
};
