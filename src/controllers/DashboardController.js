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
    const movieId = req.query.id;
    const movie = await MovieModel.getMovieById(movieId);
    console.log(movie);

    /** renderizar a view */
    res.render('movie', { movie });
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};
