const http = require('http');
const url = require('url');

const { routeSecret, ...rest } = process.env
if (!routeSecret) {
  console.error('Environment variable "routeSecret" is not set.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  
  // Check for specific parameter and value
  if (query.secret === routeSecret) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rest, null, 2));
  } else {
    res.writeHead(403, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Forbidden' }));
  }
});

const PORT = 3111;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access env vars at: http://localhost:${PORT}?secret=${routeSecret}`);
});
