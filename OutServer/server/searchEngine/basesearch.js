"use strict";

const request = require('request');
const fs = require('fs');
const SQL = require("../sql");
let gettingAll = false;

class BaseSearch {
    constructor(url) {
        this.url = url;
        this.result = "";
        this.requesturl = "";
        this.info = {};
        this.getAllInterval = null;
        this.getAllChapter = 0;
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
        // request(this.requesturl, (error, response, body) => {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body);
        //         resolve('{"error":"parseSearch not implement"}');
        //     } else {
        // console.log(error);
        resolve('{"error":"parseSearch not implement"}');
        // }
        // });
    }
    getinfo(info, response) {
        console.log(`getinfo: ${info.id} ${info.bookname}`);
        // console.log(this.requesturl);
        this.requesturl = info.url;
        this.info = info;
        let path = `books/info/${info.id}`;
        let promise = new Promise((resolve, reject) => {
            this.parseGetinfo(resolve, reject);
        });
        promise.then(data => {
            if (data !== "err") {
                let bookinfoobj = "";
                fs.exists(path, exists => {
                    if (exists) {
                        fs.readFile(path, { encoding: "utf-8" }, (err, bookinfo) => {
                            if (!err) {
                                bookinfoobj = bookinfo;
                            }
                        });
                    }
                });
                if (bookinfoobj !== "") {
                    bookinfoobj = JSON.parse(bookinfoobj);
                } else {
                    bookinfoobj = { chapterlist: [] };
                }
                let dataobj = JSON.parse(data);
                if (bookinfoobj.chapterlist.length !== dataobj.chapterlist.length) {
                    fs.writeFile(path, data, err => {
                        console.log(err);
                    });
                }
                if (response !== undefined) {
                    response.writeHead(200, { "Content-Type": "application/json" });
                    response.write(data);
                    response.end();
                }
            }
        });
    }
    parseGetinfo(resolve, reject) {
        // request(this.requesturl, (error, response, body) => {
        //     if (!error && response.statusCode == 200) {
        //         console.log(body);
        resolve('{"error":"parseGetinfo not implement"}');
        //     } else {
        //         console.log(error);
        //         resolve('{"error":"parseGetinfo not implement"}');
        //     }
        // });
    }
    getContentAll(info) {
        if (gettingAll) {
            return;
        }
        gettingAll = true;
        this.getAllInterval = setInterval(() => {
            this.getContent(info, this.getAllChapter);
            if (this.getAllChapter === info.chapterlist.length - 1) {
                clearInterval(this.getAllInterval);
                this.getAllInterval = null;
                this.getAllChapter = 0;
                gettingAll = false;
                return;
            }
            this.getAllChapter += 1;
        }, 5000);
    }
    hasContent(id, chapterid, cb) {
        let path = `books/data/${id}`;
        fs.exists(path, exists => {
            if (exists) {
                path = `${path}/${chapterid}`;
                fs.exists(path, exists => {
                    cb(exists);
                });
                return;
            }
            cb(exists);
        });
    }
    getContent(info, chapterid, response) {
        // console.log(`getContent `);
        if (chapterid*1 >= info.chapterlist.length) {
            this.getinfo(info);
            if (response !== undefined) {
                response.writeHead(200, { "Content-Type": "application/json" });
                response.write(JSON.stringify({ "msg": "no more" }));
                response.end();
            }
            return;
        }
        this.hasContent(info.id, chapterid, exists => {
            // console.log(`hasContent exists:${exists}`)
            if (exists) {
                if (response !== undefined) {
                    let path = `books/data/${info.id}/${chapterid}`;
                    fs.readFile(path, { encoding: "utf-8" }, (err, info) => {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        if (!err) {
                            // response.write(info);
                            response.write(JSON.stringify({ id: info.id, chapterid, content: info }));
                        } else {
                            response.write(JSON.stringify({ "msg": "error" }));
                        }
                        response.end();
                    });
                }
            } else {
                let promise = new Promise((resolve, reject) => {
                    this.parseGetContent(resolve, reject, info, chapterid);
                });

                promise.then(data => {
                    console.log(`Download completed: id: ${info.id} chapter:${chapterid}`);
                    if (response !== undefined) {
                        response.writeHead(200, { "Content-Type": "application/json" });
                        response.write(data);
                        response.end();
                    }
                    if (!gettingAll) {
                        this.getAllChapter = chapterid * 1;
                        this.getContentAll(info);
                    }
                });
            }
        });
    }
    parseGetContent(resolve, reject, info, chapterid) {
        resolve('{"error":"parseGetContent not implement"}');
    }
}
module.exports = BaseSearch;