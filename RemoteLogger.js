var http = require('http');
var url = require('url')

var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'url.log' })
  ]
});

winston.loggers.add('url_logger', {
  console: {
    level: 'silly',
    colorize: 'true',
    label: 'url'
  },
  file: {
    filename: 'log/url.log'
  }
});

var url_logger = winston.loggers.get('url_logger');

http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.url) {
    logger.info("", {url:query.url, from: req.connection.remoteAddress})
    url_logger.info("", {url:query.url})
  }
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.writeHead(200, {'Content-Type': 'application/javascript'});
  res.end(query.callback+'({"url":"'+query.url+'"})');
}).listen(18000);
