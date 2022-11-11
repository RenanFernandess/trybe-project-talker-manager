const getTalker = require('./getTalker');

const saveTalkerList = require('./saveTalkerList');

const deleteTalker = async (talkerId) => {
  const talkerList = await getTalker();
  const newList = talkerList.filter(({ id }) => id !== talkerId);
  await saveTalkerList(newList);
};

module.exports = deleteTalker;
