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

let renderer;
app.get('/', (req, res) => {
  const template = fs.readFileSync(path.resolve('./src/index.html'), 'utf-8');
  const contentMarker = '<!-- APP -->';

  if (renderer) {
    renderer.renderToString({ events }, (err, html) => {
      if (err) console.error(err);
      else {
        res.send(
          template.replace(
            contentMarker,
            `<script>var __INITIAL_STATE__ = ${serialize(
              events
            )}</script>\n${html}`
          )
        );
      }
    });
  } else {
    res.send('<p>Awaiting compilation..</p>');
  }
});

app.use(require('body-parser').json());
app.post('/add_event', (req, res) => {
  events.push({
    description: req.body.description,
    date: moment(req.body.date)
  });
  res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init((bundle) => {
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
  });
}

const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log(`Listening on port ${port}!`);
  if (process.env.NODE_ENV === 'development')
    require('open')(`http://localhost:${port}`);
});
