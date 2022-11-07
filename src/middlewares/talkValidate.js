const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/ig;

const talkValidate = ({ body: { talk: { watchedAt, rate }, talk } }, res, next) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (DATE_REGEX.test(watchedAt)) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  if (!rate) return res.status(400).json({ message: 'O campo "age" é obrigatório' });

  next();
};

module.exports = talkValidate;
