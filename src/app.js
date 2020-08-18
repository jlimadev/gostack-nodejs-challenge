const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(cors());
const repositories = [];

function checkUserId(request, response, next) {
  const { id } = request.params;
  const index = repositories.findIndex((repository) => repository.id === id);
  if(!repositories[index]){
    return response.status(400).send('Bad Request - This Repository does not exist');
  }
  return next();
};

app.get('/repositories', (request, response) => {
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { url, title, techs } = request.body;
  const newRepository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put('/repositories/:id', checkUserId, (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  repositories[index] = {
    id,
    url: url ? url : repositories[index].url,
    title: title ? title : repositories[index].title,
    techs: techs ? techs : repositories[index].techs,
    likes: repositories[index].likes
  };
  return response.json(repositories[index]);
});

app.delete('/repositories/:id', checkUserId, (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex((repository) => {
    return repository.id === id;
  });

  repositories.splice(index, 1);
  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
