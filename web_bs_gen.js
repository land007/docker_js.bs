var http = require("http"), url = require("url"), path = require("path"), normalize = path.normalize, join = path.join, sep = path.sep, fs = require("fs");
var querystring = require('querystring');
var crypto = require('crypto');
var hello = require('hello');

var http = require('http');
http.createServer(function(req, res) {
	var req_url = req.url;
	var host = req.headers.host, ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var query = querystring.parse(url.parse(req.url).query);
	var info = '';
	req.addListener('data', function(chunk) {
		info += chunk;
	});
	req.addListener('end', function() {
		var data = querystring.parse(info);
		var data1 = data.data1;
		var data2 = data.data2;
		var result = null;
		console.log(JSON.stringify(data));
		if(data1 !== undefined && data2 !== undefined) {
		    console.log('in');
		    result = jiami(data1, data2);
		}
		var json = {address: getClientIp(req), host: host, ip: ip, url: req_url, headers: req.headers, query: query, data: data, result: result};
		res.writeHead(200, {
            // 'Content-Type' : 'text/plain'
    		'Content-Type' : 'application/json; charset=utf-8'
    	});
		res.end(JSON.stringify(json));
		console.log(json);
	});
}).listen(18008, "0.0.0.0");
console.log('Server ready');

var getClientIp = function(req) {
	return req.headers['x-forwarded-for'] || req.connection.remoteAddress
			|| req.socket.remoteAddress;// ||
										// req.connection.socket.remoteAddress
};

var jiami = function(data1, data2) {
    var md5 = crypto.createHash('md5');
    md5.update(data2);
    var pass = md5.digest('hex');
    var _data1 = '(function (exports, require, module, __filename, __dirname) {\n' + data1 + '\n});';
    var bs = hello.hello(_data1);
    bs = bs+pass;
    console.log(bs);
    return bs;
};

console.log("Server running at http://127.0.0.1:18008/");
