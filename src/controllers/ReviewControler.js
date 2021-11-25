const ReviewModel = require('../models/ReviewModel');
const FotoUser = require('../models/FotoUser');

exports.create = async (req, res) => {
  try {
    const movieId = req.params.id;
    const userId = req.session.user._id;
    const nameUser = req.session.user.name;
    const { rating, review } = req.body;

    /** recuperar a imagem do usuário */
    let userImage = null;
    const image = await FotoUser.getFotoByUserId(req.session.user._id);

    /** verificar se o usuário possui imagem */
    if (image === null) {
      userImage = '';
    } else {
      userImage = image.key;
    }

    if (!movieId || !userId) return;

    const createReview = new ReviewModel(rating, review, userId, nameUser, movieId, userImage);
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
