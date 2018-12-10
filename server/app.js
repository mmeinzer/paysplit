const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.use('/', routes);

app.set('port', process.env.PORT || 4000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ⇒  Port ${server.address().port}`);
});
