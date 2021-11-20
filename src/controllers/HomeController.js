const FotoUser = require('../models/FotoUser');
const User = require('../models/UserModel');

exports.index = async (req, res) => {
  const user = await User.getUsers(req.session.user._id);
  const image = await FotoUser.getFotoByUserId(req.session.user._id);

  res.render('home', { user, image });
};

exports.update = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const user = new User(req.body);

    await user.update(req.params.id);

    if (user.errors.length > 0) {
      req.flash('errors', user.errors);
      req.session.save(() => res.redirect('/home'));
    }

    req.flash('success', 'Usuário editado com sucesso!');
    req.session.save(() => res.redirect('/home'));
  } catch (e) {
    console.log(e);
    return res.render('404');
  }
};
