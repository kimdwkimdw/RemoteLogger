var http = require('http');
var url = require('url')

var winston = require('winston');

winston.loggers.add('url_logger', {
  file: {
    filename: 'url.log'
  }
});

var url_logger = winston.loggers.get('url_logger');

http.createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  if (query.url) {
    url_logger.log(query.url)
    winston.info(query.url)
  }
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.writeHead(200, {'Content-Type': 'application/javascript'});
  res.end(query.callback+'({"url":"'+query.url+'"})');
}).listen(8080);
