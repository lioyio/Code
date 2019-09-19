"use strict";

const sqlite3 = require("sqlite3");

class SQL {
    constructor() {
        this.database = "bookinfo.db";
    }
    run(sql, objects) {
        const DB = new sqlite3.Database(this.database);
        DB.serialize(function () {
            var stmt = DB.prepare(sql);
            for (var i = 0; i < objects.length; ++i) {
                stmt.run(objects[i]);
            }

            stmt.finalize();
            DB.close();
        });
    }
    exec(sql) {
        const DB = new sqlite3.Database(this.database);
        DB.run(sql);
        DB.close();
    }
    all(sql, cb) {
        const DB = new sqlite3.Database(this.database);
        DB.all(sql, (a, results) => {
            DB.close();
            cb(results);
        });
    }
}
/*
CREATE TABLE book(id INTEGER PRIMARY KEY AUTOINCREMENT,bookname TEXT NOT NULL,author TEXT NOT NULL,url TEXT NOT NULL,lastdate TEXT,lastchapter TEXT,type TEXT,state TEXT,img TEXT,intro TEXT);
insert into book (bookname,author,url,lastdate,lastchapter,type,state,img,intro) values("name","author","http://111","today","chapter1","1","1","http://img","intro")
select * from book where bookname="a" and author="c"
*/

const SQLObj = new SQL();
module.exports = SQLObj;