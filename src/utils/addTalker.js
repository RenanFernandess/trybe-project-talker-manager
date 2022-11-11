const getTalker = require('./getTalker');

const saveTalkerList = require('./saveTalkerList');

const addTalker = async (talker) => {
  const talkers = await getTalker();
  const obj = { ...talker, id: (talkers.length + 1) };
  const talkerList = [...talkers, obj];
  await saveTalkerList(talkerList);
  return obj;
};

module.exports = addTalker;
