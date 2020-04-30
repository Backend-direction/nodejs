const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url, method);
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method == 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.text', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }

  // res.setHeader('Content-Type', 'text/html');
  // res.write('<html>');
  // res.write(
  //   '<body><h1>Main page</h1></body>'
  // );
  // res.write('</html>');
  // res.end();
};

module.exports = {
  handler: requestHandler,
  text: 'some text',
};