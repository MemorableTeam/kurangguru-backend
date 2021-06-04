const express = require('express');
const app = express();
require('dotenv').config()
const host = process.env.HOST;
const port = process.env.PORT;
const bodyParser = require('body-parser');

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require('./routes')
router(app, '/kurangguru/api/v1')

app.get('*', (req, res) => {
  res.status(404).send({
    message: 'Page not found!',
    status: 404
  })
});

app.listen(port, () => {
  console.log(`Server started on http://${host}:${port}`);
});