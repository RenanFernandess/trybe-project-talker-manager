const getTalker = require('./getTalker');

const getTalkerId = async (talkerId) => {
  const talkers = await getTalker();
  const talker = talkers.find(({ id }) => id === talkerId);
  return talker;
};

module.exports = getTalkerId;
