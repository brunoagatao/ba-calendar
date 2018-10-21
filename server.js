const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
const serialize = require('serialize-javascript');

moment.tz.setDefault('UTC');

const app = express();
app.use('/public', express.static(path.join(__dirname, 'public')));

const events = [
  {
    description: 'Random event 1',
    date: moment('2018-10-10', 'YYYY-MM-DD')
  },
  {
    description: 'Random event 2',
    date: moment('2018-10-12', 'YYYY-MM-DD')
  },
  {
    description: 'Random event 3',
    date: moment('2018-10-14', 'YYYY-MM-DD')
  }
];

const template = fs.readFileSync(path.resolve('./src/index.html'), 'utf-8');
const contentMarker = '<!-- APP -->';
app.get('/', (req, res) => {
  res.send(
    template.replace(
      contentMarker,
      `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>`
    )
  );
});

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
