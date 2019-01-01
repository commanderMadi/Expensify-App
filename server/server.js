const path = require('path');
const express = require('express');
const secure = require('express-force-https');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use([
    secure,
    express.static(publicPath)
]);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up on port ', port);
});