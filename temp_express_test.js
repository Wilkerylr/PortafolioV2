const express = require('express');
const app = express();
app.post('/api/login', (req, res) => res.end('ok'));
const server = app.listen(0, () => {
  const port = server.address().port;
  const http = require('http');
  const req = http.request({ method: 'POST', hostname: '127.0.0.1', port, path: '//api/login' }, res => {
    console.log('status', res.statusCode);
    res.on('data', d => process.stdout.write(d));
    res.on('end', () => server.close());
  });
  req.end();
});
