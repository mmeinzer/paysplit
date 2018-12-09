const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());

app.use('/', routes);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running ⇒  Port ${server.address().port}`);
});
