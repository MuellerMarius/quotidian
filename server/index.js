const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const entries = require('./routes/api/entries');
const activities = require('./routes/api/activities');
const common = require('./routes/api/common');
const user = require('./routes/user');

const publicPath = path.join(__dirname, '..', 'client', 'build');

dotenv.config();
const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({ origin: process.env.CLIENT_ORIGIN_URLS.split(','), credentials: true })
);
app.use(express.json());
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

app.use('/api/user', user);
app.use('/api/entries', entries);
app.use('/api/activities', activities);
app.use('/api/', common);
app.get('*', (req, res) => res.sendFile(path.join(publicPath, 'index.html')));

//
// Run /////////////////////////////////////////////////////////////
//

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
