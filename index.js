const http = require('http');
var projects = require('./data-store');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/projects/:id' && method === 'GET') {
    for (i = 0; i < projects.projects.length; i++) {
      if (+url[10, 13] === projects.projects[i].id) {
        return req.on('end', () => {
          res.statusCode = 200;
          res.json({ "project data": projects.projects[i] })
          return res.end();
        });
      } else {
        return req.on('end', () => {
          res.statusCode = 404;
          return res.end();
        });
      }
    }
  } else if (url === '/projects' && method === 'GET') {
    return req.on('end', () => {
      res.statusCode = 400;
      res.json({ "message": "BAD REQUEST" });
      return res.end();
    });
  } else {
    return req.on('end', () => {
      res.statusCode = 404;
      return res.end();
    });
  }
};

const server = http.createServer(requestHandler);

server.listen(8000);
