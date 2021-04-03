const express = require('express');
const app = express();
const port = 4000 || process.env.PORT;

app.get('/', (req, res) => {
  res.sendFile('../client/App.js');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// API endpoints;
app.use(express.static(path.join(__dirname, 'public')))