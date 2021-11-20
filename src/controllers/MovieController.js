exports.index = (req, res) => {
  res.render('newmovie');
};

exports.create = (req, res) => {
  console.log(req.body);
  console.log(req.file);
};
