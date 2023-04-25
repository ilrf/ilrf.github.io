
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let baseUrl = path.join(__dirname, '..');

  let filePath = path.join(baseUrl, req.url);

  if (filePath === path.join(baseUrl, '/')) {
    filePath = path.join(baseUrl, './index.html');
  }

  console.log(`Request for ${filePath}`);

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(`File ${filePath} not found`);
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    if (stats.isDirectory()) {
      console.error(`File ${filePath} is a directory`);
      res.statusCode = 400;
      res.end('File is a directory');
      return;
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

const port = 3000;
const hostname = '127.0.0.1';

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

