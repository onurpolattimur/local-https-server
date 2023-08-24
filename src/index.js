const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8443;

// Load SSL certificates
const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../certificates/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certificates/cert.pem')),
};


app.use(express.static(path.resolve(__dirname, '../public/'), {index: 'index.html'}));

// Start HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
