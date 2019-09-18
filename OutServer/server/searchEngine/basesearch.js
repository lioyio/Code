"use strict";

const request = require('request');
const fs = require('fs');

class BaseSearch {
    constructor(url) {
        this.url = url;
        this.result = "";
        this.requesturl = "";
        this.info = {};
    }
    search(bookname, response) {
        console.log(`searchbook: ${bookname}`);
        bookname = encodeURI(bookname);
        this.requesturl = this.url + bookname;
        // console.log(this.requesturl);
        let promise = new Promise((resolve, reject) => {
            this.parseSearch(resolve, reject);
        });

        promise.then(data => {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(data);
            response.end();
        });
    }
    parseSearch(resolve, reject) {
        request(this.requesturl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve('{"error":"parseSearch not implement"}');
            } else {
                console.log(error);
                resolve('{"error":"parseSearch not implement"}');
            }
        });
    }
    getinfo(info, response) {
        console.log(`getinfo: ${info.id} ${info.bookname}`);
        // console.log(this.requesturl);
        this.requesturl = info.url;
        this.info = info;
        let path = `books/info/${info.id}`;
        fs.exists(path, exists => {
            if (exists) {
                let bookinfo = fs.readFileSync(path, { encoding: "utf-8" });
                let bookinfoobj = JSON.parse(bookinfo);
                if (bookinfoobj.lastdate === info.lastdate
                    && bookinfoobj.lastchapter === info.lastchapter
                    && bookinfoobj.state === info.state) {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.write(bookinfo);
                    response.end();
                    return;
                }
            }
            let promise = new Promise((resolve, reject) => {
                this.parseGetinfo(resolve, reject);
            });
            promise.then(data => {
                if (data !== "err") {
                    fs.writeFile(path, data, err => {
                        console.log(err);
                    });
                }
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(data);
                response.end();
            });
        });
    }
    parseGetinfo(resolve, reject) {
        request(this.requesturl, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                console.log(body);
                resolve('{"error":"parseGetinfo not implement"}');
            } else {
                console.log(error);
                resolve('{"error":"parseGetinfo not implement"}');
            }
        });
    }
}
module.exports = BaseSearch;