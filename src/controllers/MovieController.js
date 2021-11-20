const MovieModel = require('../models/MovieModel');

exports.index = (req, res) => {
  res.render('newmovie');
};

exports.create = async (req, res) => {
  try {
    if (!req.file) {
      req.flash('errors', 'Selecione uma imagem para fazer o upload.');
      req.session.save(() => res.redirect('/newmovie'));
    }

    const movie = new MovieModel(req.body, req.file);
    const userID = req.session.user._id;

    await movie.register(userID);

    if (movie.errors.length > 0) {
      req.flash('errors', movie.errors);
      req.session.save(() => res.redirect('/newmovie'));
      return;
    }

    req.flash('success', 'Filme cadastrado com sucesso!');
    return req.session.save(() => res.redirect('/newmovie'));
  } catch (e) {
    console.log(e);
  }
};
