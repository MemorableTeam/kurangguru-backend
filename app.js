const express = require('express');
const app = express();
require('dotenv').config()
const port = 3030;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routes')
router(app, '/kurangguru/api/v1')

app.get('/', (req, res) => {
  res.json({
    message: 'Ini Home'
  })
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});