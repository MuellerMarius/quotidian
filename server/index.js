const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const entries = require('./routes/api/entries');

const publicPath = path.join(__dirname, '..', 'client', 'build');

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN_URLS.split(',') }));
app.use(bodyParser.json());
app.use(express.static(publicPath));

//
// MongoDB ////////////////////////////////////////////////////////
//

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.error(err));

//
// Routes //////////////////////////////////////////////////////////
//

app.use('/api/entries', entries);
app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

//
// Run /////////////////////////////////////////////////////////////
//

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
