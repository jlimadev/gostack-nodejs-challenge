const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');
const app = express();

app.use(express.json());
app.use(cors());
const repositories = [];

function checkRepositoryId(request, response, next) {
  const { id } = request.params;
  const index = repositories.findIndex((repository) => repository.id === id);
  if(!repositories[index]){
    return response.status(400).send('Bad Request - This Repository does not exist');
  }
  return next();
};

const getIndex = (repositories, id) => {
  return repositories.findIndex((repository) => {
    return repository.id === id;
  });
}

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

app.put('/repositories/:id', checkRepositoryId, (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;
  const index = getIndex(repositories, id);

  repositories[index] = {
    id,
    url: url ? url : repositories[index].url,
    title: title ? title : repositories[index].title,
    techs: techs ? techs : repositories[index].techs,
    likes: repositories[index].likes
  };
  return response.json(repositories[index]);
});

app.delete('/repositories/:id', checkRepositoryId, (request, response) => {
  const { id } = request.params;
  const index = getIndex(repositories, id);
  repositories.splice(index, 1);
  return response.status(204).send();
});

app.post('/repositories/:id/like', checkRepositoryId, (request, response) => {
  const { id } = request.params;
  const index = getIndex(repositories, id);
  repositories[index].likes = repositories[index].likes + 1;
  return response.json(repositories[index]);
});

module.exports = app;
