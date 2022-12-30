const { parse } = require("url");
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const hostname = 'localhost'
const port = 3000;
const app = next({ dev, hostname, port });
const fs = require("fs");
const handle = app.getRequestHandler();

let httpsOptions = {};
var { createServer } = require("https");
httpsOptions = {
  key: fs.readFileSync("./dev/cert/localhost.key"),
  cert: fs.readFileSync("./dev/cert/localhost.crt"),
};


app.prepare().then(async () => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
