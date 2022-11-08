const express = require('express');
const bodyParser = require('body-parser');

const getTalker = require('./utils/getTalker');
const getTalkerId = require('./utils/getTalkerId');
const deleteTalker = require('./utils/deleteTalker');
const addTalker = require('./utils/addTalker');
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

app.post('/talker', tokenValidate, talkerValidate, talkValidate, (
  { body, body: { talk: { rate } } },
  res,
) => {
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  addTalker(body);
  res.status(201).send();
});

// app.put('/talker/:id');

app.delete('/talker/:id', tokenValidate, ({ params: { id } }, res) => {
  deleteTalker(Number(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
