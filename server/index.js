const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, '..', 'client', 'build');
const data = [];

const serveClient = (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
};

//
// Routes //////////////////////////////////////////////////////////
//s

app.use(express.static(publicPath));
app.get('*', serveClient);

//
// Run /////////////////////////////////////////////////////////////
//

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
