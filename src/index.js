const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require("path");
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 8443;

// Load SSL certificates
const certFilePath = path.resolve(__dirname, '../certificates/cert.pem');
const ketFilePath = path.resolve(__dirname, '../certificates/key.pem');

const options = {
  key: fs.readFileSync(ketFilePath),
  cert: fs.readFileSync(certFilePath),
};


app.use(express.static(path.resolve(__dirname, '../public/'), {index: 'index.html'}));

// Start HTTPS server
const server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Access your app via https://${getDnsName()}:${PORT}`)
});


const getDnsName= () =>{
  return execSync(`openssl x509 -in ${certFilePath} -noout -text | awk -F: '/DNS:/ {print $2}'`).toString().replaceAll('\n','')
}
