exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.fotoUser = req.session.fotoUser;
  next();
};

exports.checkCsrfToken = (err, req, res, next) => {
  if (err) {
    return res.render('404');
  }

  return next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

/** middleware responsavel em saber se o usuário esta logado */
exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa está logado!');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
};
