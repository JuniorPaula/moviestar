const ReviewModel = require('../models/ReviewModel');

exports.create = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.session.user._id;
    const { rating, review } = req.body;

    if (!movieId || !userId) return;

    const createReview = new ReviewModel(rating, review, userId, movieId);
    await createReview.create();

    if (createReview.errors.length > 0) {
      req.flash('errors', createReview.errors);
      req.session.save(() => res.redirect(`/movie?id=${movieId}`));
      return;
    }

    req.flash('success', 'Comentário inserido com sucesso!');
    return req.session.save(() => res.redirect(`/movie?id=${movieId}`));
  } catch (e) {
    console.log(e);
  }
};
