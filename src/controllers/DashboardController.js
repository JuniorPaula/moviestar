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
