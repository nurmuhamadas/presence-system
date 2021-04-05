const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const employees = require('./routes/employees.route');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/v1/employees', employees);

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'));
});

module.exports = app;
