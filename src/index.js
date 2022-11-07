const express = require('express');
const bodyParser = require('body-parser');

const getTalker = require('./utils/getTalker');
const getTalkerId = require('./utils/getTalkerId');
const deleteTalker = require('./utils/deleteTalker');
const { tokenGenerator } = require('./utils/tokenGenerator');
const tokenValidate = require('./middlewares/tokenValidate');
const loginValidate = require('./middlewares/loginValidate');
const talkerValidate = require('./middlewares/talkerValidate');

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

app.post('/talker', tokenValidate, talkerValidate, (req, res) => {
  res.status(HTTP_OK_STATUS).send();
});

// app.put('/talker/:id');

app.delete('/talker/:id', tokenValidate, ({ params: { id } }, res) => {
  deleteTalker(Number(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
