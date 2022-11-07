const express = require('express');
const bodyParser = require('body-parser');

const getTalker = require('./utils/getTalker');
const getTalkerId = require('./utils/getTalkerId');
// const deleteTalker = require('./utils/deleteTalker');
const { tokenGenerator } = require('./utils/tokenGenerator');

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

app.post('/login', ({ body: { email, password } }, res) => {
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!/^\w+@\w+(\.\w+)+$/i.test(email)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  res.status(HTTP_OK_STATUS).json({ token: tokenGenerator() });
});

// app.post('/talker');

// app.put('/talker/:id');

// app.delete('/talker/:id', ({ params: { id } }, res) => {
//   if (!token) res.status(401).json({ message: 'Token não encontrado' });
//   if (token !== 16) res.status(401).json({ message: 'Token inválido' });

//   deleteTalker(Number(id));

//   res.status(204).send();
// });

app.listen(PORT, () => {
  console.log('Online');
});
