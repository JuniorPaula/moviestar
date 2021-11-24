/** importa o mongoose */
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  rating: { type: String },
  review: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nameUser: { type: String },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MovieModel',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

const Review = mongoose.model('ReviewModel', ReviewSchema);

class ReviewModel {
  constructor(rating, review, userId, nameUser, movieId) {
    this.rating = rating;
    this.review = review;
    this.userId = userId;
    this.nameUser = nameUser;
    this.movieId = movieId;
    this.errors = [];
  }

  /** método responsável por resgatar todos as reviews */
  static async getReviewMovieById(id) {
    if (!id) return;

    const reviews = await Review.find({ movieId: id });

    return reviews;
  }

  /** método responsável por criar um comentário */
  async create() {
    this.valid();

    await Review.create({
      rating: this.rating,
      review: this.review,
      userId: this.userId,
      nameUser: this.nameUser,
      movieId: this.movieId,
    });
  }

  /** método responsável por validar os capos */
  valid() {
    if (!this.rating) this.errors.push('Campo nota precisa ser preenchido!');
    if (!this.review) this.errors.push('Campo comentário precisa ser preenchido!');
  }
}

module.exports = ReviewModel;
