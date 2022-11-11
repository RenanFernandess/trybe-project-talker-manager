const getTalker = require('./getTalker');

const saveTalkerList = require('./saveTalkerList');

const updateTalker = async (talkerId, body) => {
  const talkers = await getTalker();
  const talkerIndex = talkers
    .reduce((acc, { id }, ind) => (id === talkerId ? ind : acc), null);
  talkers[talkerIndex] = { ...talkers[talkerIndex], ...body };
  await saveTalkerList(talkers);
  return talkers[talkerIndex];
};

module.exports = updateTalker;
