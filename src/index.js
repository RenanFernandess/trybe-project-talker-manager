const express = require('express');
const bodyParser = require('body-parser');

const getTalker = require('./utils/getTalker');
const getTalkerId = require('./utils/getTalkerId');
const deleteTalker = require('./utils/deleteTalker');
const addTalker = require('./utils/addTalker');
const updateTalker = require('./utils/updateTalker');
const { tokenGenerator } = require('./utils/tokenGenerator');
const tokenValidate = require('./middlewares/tokenValidate');
const loginValidate = require('./middlewares/loginValidate');
const talkerValidate = require('./middlewares/talkerValidate');
const talkValidate = require('./middlewares/talkValidate');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talkers = await getTalker();
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async ({ params: { id } }, res) => {
  const talker = await getTalkerId(Number(id));

  if (talker) return res.status(HTTP_OK_STATUS).json(talker);

  res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

// app.get('/talker/search?q=searchTerm');

app.post('/login', loginValidate, (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
});

app.post('/talker', tokenValidate, talkerValidate, talkValidate, async ({ body }, res) => {
  const talker = await addTalker(body);
  return res.status(201).send(talker);
});

app.put('/talker/:id', tokenValidate, talkerValidate, talkValidate, async (
  { params: { id }, body }, res) => {
  const talker = await updateTalker(Number(id), body);
  return res.status(HTTP_OK_STATUS).json(talker);
});

app.delete('/talker/:id', tokenValidate, async ({ params: { id } }, res) => {
  await deleteTalker(Number(id));
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
