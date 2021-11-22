const MovieModel = require('../models/MovieModel');

/** Controllers da pagina inicial */
exports.index = async (req, res) => {
  /** ultilizando o render pra rendirizar a index.ejs na view */
  const movies = await MovieModel.getMovies();
  const movieAcao = await MovieModel.getMovieByCatagory('Ação');
  const movieComedia = await MovieModel.getMovieByCatagory('Comédia');
  const movieDrama = await MovieModel.getMovieByCatagory('Drama');
  const movieFiccao = await MovieModel.getMovieByCatagory('Ficção/Fantasia');
  const movieRomance = await MovieModel.getMovieByCatagory('Romance');

  res.render('index', {
    movies,
    movieAcao,
    movieComedia,
    movieDrama,
    movieFiccao,
    movieRomance,
  });
};
