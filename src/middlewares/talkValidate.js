const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/;
const CODE_ERROR = 400;

const checkWatchedAt = (item) => {
  let message;
  let code;
  if (!item) {
    code = CODE_ERROR;
    message = 'O campo "watchedAt" é obrigatório';
  }
  if (!DATE_REGEX.test(item) && item) {
    code = CODE_ERROR;
    message = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  return { code, message };
};

const checkRate = (rate) => {
  let message;
  let code;
  console.log(rate);
  if (Number.isNaN(rate)) {
    code = CODE_ERROR;
    message = 'O campo "rate" é obrigatório';
    return { code, message };
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    code = CODE_ERROR;
    message = 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return { code, message };
};

const talkValidate = ({ body: { talk } }, res, next) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });

  const { watchedAt, rate } = talk;
  const { code, message } = checkWatchedAt(watchedAt);
  const { code: statusCode, message: errorMessage } = checkRate(Number(rate));

  if (code) return res.status(code).json({ message });
  if (statusCode) return res.status(statusCode).json({ message: errorMessage });

  next();
};

module.exports = talkValidate;
