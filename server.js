const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

const template = fs.readFileSync(path.resolve('./src/index.html'), 'utf-8');
app.get('/', (req, res) => {
  res.send(template);
});

const events = [];

app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
  events.push(req.body);
  res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  require('./webpack-dev-middleware').init(app);
  const reload = require('reload');
  const reloadServer = reload(server, app);
}

const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Listening on port ${port}!`);
  if (process.env.NODE_ENV === 'development')
    require('open')(`http://localhost:${port}`);
});
