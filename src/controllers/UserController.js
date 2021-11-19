const User = require('../models/UserModel');

exports.index = (req, res) => {
  res.render('auth');
};

exports.register = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.register();

    if (user.errors.length > 0) {
      req.flash('errors', user.errors);
      req.session.save(() => res.redirect('/auth'));
      return;
    }

    req.flash('success', 'Usuário criado com sucesso!');
    req.session.save(() => res.redirect('/auth'));
  } catch (e) {
    console.log(e);
  }
};
