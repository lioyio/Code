"use strict";

const http = require("http");
const url = require("url");
const run = require("./main");

http.createServer((req, res) => {
    let reqparam = url.parse(req.url, true);
    run(reqparam.pathname, reqparam.query, res);
}).listen(1234);