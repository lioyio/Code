"use strict";

const bequgew_com = require("./searchEngine/bequgew_com");
const SQL = require("./sql");
const fs = require("fs");

function run(action, param, response) {
    console.log(`request msg: ${action}`);
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Requested-With"
    });
    switch (action) {
        case "/search": {
            searchBook(param, response)
        }
            break;
        case "/getinfo": {
            getBookInfo(param, response);
        }
            break;
        case "/getcontent": {
            getBookContent(param, response);
        }
            break;
        default:
            response.write('<header><meta charset="utf-8"/></header>unknown err');
            response.end();
            break;
    }
}

function searchBook(param, response) {
    let bookname = param.bk;
    let sqlstr = `select * from book where bookname="${bookname}"`;
    SQL.all(sqlstr, result => {
        let searchEngine = new bequgew_com();
        searchEngine.search(bookname, response);
    });
}

function getBookInfo(param, response) {
    let bookname = param.bk;
    let author = param.at;
    let sqlstr = `select * from book where bookname="${bookname}" and author="${author}"`;
    SQL.all(sqlstr, result => {
        if (result.length !== 0) {
            let searchEngine = new bequgew_com();
            searchEngine.getinfo(result[0], response);
        } else {
            response.write('{"error","book not found"}');
            response.end();
        }
    });
}

function getBookContent(param, response) {
    let id = param.id;
    let chapter = param.cp;
    console.log(`getBookContent id:${id} chapter:${chapter}`)
    let path = `books/info/${id}`;
    let searchEngine = new bequgew_com();

    fs.exists(path, exists => {
        if (exists) {
            // let info = fs.readFileSync(path, { encoding: "utf-8" });
            fs.readFile(path, { encoding: "utf-8" }, (err, info) => {
                if (!err) {
                    info = JSON.parse(info);
                    searchEngine.getContent(info, chapter, response);
                    // searchEngine.getContentAll(info);
                }
            });
        } else {
            response.write('{"error","book not found"}');
            response.end();
        }
    });
}


module.exports = run;