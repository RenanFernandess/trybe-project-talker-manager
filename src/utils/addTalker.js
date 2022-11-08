const getTalker = require('./getTalker');

const saveTalkerList = require('./saveTalkerList');

const addTalker = async (talker) => {
  const talkers = await getTalker();
  const talkerList = [...talkers, { ...talker, id: (talkers.length + 1) }];
  saveTalkerList(talkerList);
};

module.exports = addTalker;
