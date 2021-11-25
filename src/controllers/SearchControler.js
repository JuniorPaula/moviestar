const MovieModel = require('../models/MovieModel');

exports.index = async (req, res) => {
  try {
    const { q } = req.query;

    const getMovies = await MovieModel.getMovieByTitle(q);
    const movies = getMovies.map((el) => el);

    res.render('search', {
      q, movies,
    });
  } catch (e) {
    console.log(e);
    res.render('404');
  }
};
