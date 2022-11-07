const CHARACTERS = 'ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz0123456789';

const generateRandomIndex = () => Math.round(Math.random() * CHARACTERS.length - 1);

const tokenGenerator = () => {
  const TOKEN_NUMBER_CHARACTERS = 16;
  const TOKEN = Array(TOKEN_NUMBER_CHARACTERS).fill('')
    .reduce((acc) => `${acc}${CHARACTERS[generateRandomIndex()]}`, '');
  return TOKEN;
};

module.exports = {
  tokenGenerator,
  generateRandomIndex,
};
