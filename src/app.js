const express = require('express');
const cors = require('cors');

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  return response.json(repositories)
});

app.post('/repositories', (request, response) => {
  const { url, title, techs } = request.body;
  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0,
  };
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { repository } = response.body;
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
