// const express = require('express');
// const path = require('path');
// const app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'logoswayatt.png'));
// });

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000');
// });

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); // To parse JSON payloads
const app = express();

// Parse JSON payloads from GitHub
app.use(bodyParser.json());

// Serve your logo on GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'logoswayatt.png'));
});

// GitHub webhook endpoint
app.post('/github-webhook', (req, res) => {
  console.log('Webhook received:', req.body); // Log the payload
  res.status(200).send('OK'); // Respond with 200 to GitHub
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
