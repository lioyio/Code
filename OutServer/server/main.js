"use strict";

const bequgew_com = require("./searchEngine/bequgew_com");
const SQL = require("./sql");

function run(action, param, response) {
    console.log(`request msg: ${action}`);
    switch (action) {
        case "/search": {
            searchBook(param, response)
        }
            break;
        case "/getinfo": {
            getBookInfo(param, response);
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
        // if (result.length === 0) {
        let searchEngine = new bequgew_com();
        searchEngine.search(bookname, response);
        // } else {
        //     response.writeHead(200, {"Content-Type": "application/json"});
        //     response.write(JSON.stringify(result));
        //     response.end();
        // }
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
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write('{"error","book not found"}');
            response.end();
        }
    });
}

module.exports = run;