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

exports.login = async (req, res) => {
  try {
    const login = new User(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/auth'));
      return;
    }

    req.flash('success', 'Bem vindo!');
    req.session.user = login.user;
    req.session.save(() => res.redirect('/home'));
  } catch (e) {
    console.log(e);
  }
};
