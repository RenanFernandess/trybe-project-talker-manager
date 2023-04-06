const getTalker = require('./getTalker');

const findTalkersByQuery = async (query) => {
  const talkers = await getTalker();
  return talkers.filter(({ name }) => name.includes(query));
};

module.exports = findTalkersByQuery;
