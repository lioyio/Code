"use strict";

const request = require('request');
const BaseSearch = require("./basesearch");
const cheerio = require("cheerio");
const SQL = require("../sql");
const fs = require("fs");

const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}

class SearchEngine extends BaseSearch {
    constructor() {
        super("https://www.bequgew.com/modules/article/search.php?searchkey=");
    }
    parseSearch(resolve, reject) {
        let options = {
            url: this.requesturl,
            // encoding: null,
            //代理服务器
            //proxy: 'http://xxx.xxx.xxx.xxx:8888',
            headers
        }
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                //console.log(body);
                console.log("geted html from bequgew.com");
                // body = iconv.encode(body,'utf-8')
                let $ = cheerio.load(body);
                let grid = $('table.grid tr');
                if (grid.length >= 2) {
                    let books = [];
                    grid.each((index, val) => {
                        if (index !== 0 && index <= 10) {
                            let book = {};
                            let booktd = $('td', val);
                            book.bookname = $('a', booktd[0]).text();
                            book.url = $('a', booktd[0]).attr("href");
                            book.lastchapter = $('a', booktd[1]).text();
                            book.author = $(booktd[2]).text();
                            // book.lastdate = $(booktd[4]).text();
                            book.state = $(booktd[5]).text();
                            books.push(book);
                        }
                    });
                    var promiseArr = [];
                    books.forEach((elem, index, arr) => {
                        promiseArr.push(new Promise((resolve, reject1) => {
                            let options = {
                                url: elem.url,
                                headers,
                                gzip: true
                            }
                            request(options, (error, response, body) => {
                                if (!error && response.statusCode == 200) {
                                    let $ = cheerio.load(body, { decodeEntities: false });
                                    let content = $('.content');
                                    books[index].img = $(".img img", content).attr("src");
                                    books[index].intro = $("#intro", content).text();
                                    books[index].type = $($(".info p")[0]).text().split("所属类型：")[1];
                                    books[index].lastdate = $(".info .s").text().split("更新时间：")[1];
                                    resolve();
                                    // console.log(books[index]);
                                } else {

                                }
                            });
                        }))
                    });
                    Promise.all(promiseArr).then(data => {
                        let insertArr = [];
                        let updateArr = [];
                        let promiseArr = [];
                        books.forEach((val, index, arr) => {
                            promiseArr.push(new Promise((resolve, reject) => {
                                let sqlstr = `select * from book where bookname="${val.bookname}" and author="${val.author}"`;
                                SQL.all(sqlstr, result => {
                                    if (result.length === 0) {
                                        insertArr.push([val.bookname, val.author, val.url, val.lastdate, val.lastchapter, val.type, val.state, val.img, val.intro]);
                                    } else {
                                        if (result[0].lastchapter !== val.lastchapter
                                            || result[0].lastdate !== val.lastdate
                                            || result[0].state !== val.state) {
                                            updateArr.push(`update book set lastdate="${val.lastdate}",lastchapter="${val.lastchapter}",state="${val.state}" where id=${result[0].id};`)
                                        }
                                    }
                                    resolve();
                                });
                            }));
                        });
                        Promise.all(promiseArr).then(data => {
                            if (insertArr.length !== 0) {
                                let insertstr = `insert into book (bookname,author,url,lastdate,lastchapter,type,state,img,intro) values(?,?,?,?,?,?,?,?,?)`;
                                SQL.run(insertstr, insertArr);
                            }
                            if (updateArr.length !== 0) {
                                updateArr.forEach((val, index, arr) => {
                                    SQL.exec(val);
                                });
                            }
                            resolve(JSON.stringify(books));
                        });
                    })
                    // console.log(JSON.stringify(books));
                } else {
                    console.log("book not found.");
                    resolve('{"error":"not found"}');
                }
            } else {
                console.log(error);
                resolve('{"error":"request error"}');
            }
        });
    }
    parseGetinfo(resolve, reject) {
        let options = {
            url: this.requesturl,
            headers,
            gzip: true
        }
        let info = {};
        info = this.info;
        info.chapterlist = [];
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(body, { decodeEntities: false });
                let chapterlist = $('.article_texttitleb #chapterlist a');
                chapterlist.each((index, elem) => {
                    let chapter = {};
                    chapter.id = index;
                    chapter.url = $(elem).attr("href");
                    chapter.name = $(elem).text();
                    info.chapterlist.push(chapter);
                });
                resolve(JSON.stringify(info));
                // console.log(books[index]);
            } else {
                resolve("err");
            }
        });
    }
    parseGetContent(resolve, reject, info, chapterid) {
        // console.log(`parseGetContent `);
        let options = {
            url: `https://www.bequgew.com${info.chapterlist[chapterid].url}`,
            headers,
            gzip: true
        }
        // console.log(options);
        let path = `books/data/${info.id}`;
        fs.mkdir(path, err => {
            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    // console.log(body);
                    let $ = cheerio.load(body, { decodeEntities: false });
                    let content = $("#book_text").text().replace(/\s+/g, "\n\t");
                    path = `${path}/${chapterid}`;
                    fs.writeFile(path, content, err => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    resolve(JSON.stringify({ id: info.id, chapter: chapterid, content }));
                    // console.log(books[index]);
                } else {
                    resolve("err");
                }
            });
        });
    }
}


module.exports = SearchEngine;