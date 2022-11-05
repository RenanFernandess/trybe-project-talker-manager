const { writeFile } = require('fs/promises');
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

const saveTalkerList = (list) => {
  writeFile(talkerPath, JSON.stringify(list));
};

module.exports = saveTalkerList;