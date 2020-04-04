const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config.js');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

//middleware
app.use(bodyParser.json());
app.use(cors());

const auth = require('./routes/auth');
const books = require('./routes/books');
const catalogs = require('./routes/catalogs');
const readers = require('./routes/readers');

app.use('/api/auth', auth);
app.use('/api/books', books);
app.use('/api/catalogs', catalogs);
app.use('/api/readers', readers);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));