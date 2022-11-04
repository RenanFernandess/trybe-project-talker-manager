const { readFile } = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const getTalker = async () => {
  const response = await readFile(talkerPath);
  const talker = JSON.parse(response);
  console.log(talker);
  return talker;
};

module.exports = getTalker;