const port = process.env.PORT || 3000;
const pageSize = process.env.PAGE_SIZE || 50;
const cacheExpire = process.env.CACHE_EXPIRE || 86400000;
const express = require('express');

let server = express();

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

/**
 * - valid page number
 * - check if cache is expired
 * - if not expire search page data in cache
 * - if no data in cache pull data from API and populate the cache
 */
server.get('/api/news', (req, res) => {
    let page = Number.parseInt(req.query.page) || 1;

    if (!validate(page)) {
        console.log(`invalid page: ${page}`);
        res.status(400).send({hits: []});
        return;
    }

    if (isExpire()) {
        console.info(`cache expired: ${page}`);
        reset();
    } else {
        let cache = read(page);

        if (cache.length > 0) {
            console.log(`cache hit: ${page}`);
            res.status(200).send({hits: cache});
            return;
        }
    }

    console.log(`fetch news: ${page}`);

    fetchIds().then((newsIds) => {
        fetchNews(newsIds).then((news) => {
            createPages(news).forEach((page) => {
                write(page);
            });

            res.status(200).send({hits: read(page)});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({hits: []});
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({hits: []});
    });
});

let createPages = (list) => {
    if (list.length < pageSize) {
        return list;
    }

    let pages = [];
    for (let i = 0; i < list.length; i = i + pageSize) {
        pages.push(list.slice(i, i + pageSize));
    }

    return pages;
};

const axios = require('axios');

let fetchIds = () => {
    return axios.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(
        (resp) => {
            return resp.data || [];
        },
        (err) => {
            return Promise.reject(err)
        }
    )
};

let fetchNews = (newsIds) => {
    return Promise.all(newsIds.map((newsId) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`).then(
            (res) => {
                return {
                    id: res.data['id'],
                    title: res.data['title'],
                    created_at: new Date(res.data['time'] * 1000),
                    author: res.data['by'],
                    text: res.data['text'],
                    url: res.data['url']

                };
            },
            (err) => {
                return Promise.reject(err)
            }
        )
    }));
};

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const dbfile = new FileSync('cache.db');
const db = lowdb(dbfile);

db.defaults({news: [], lastPage: 1, timestamp: Date.now()}).write();

let write = (pageData) => {
    let lastPage = db.get('lastPage').value();

    if (db.get('news').find({page: lastPage}).value()) {
        let nextPage = lastPage + 1;
        db.set('lastPage', nextPage).write();
        db.get('news').push({page: nextPage, data: pageData}).write();
    } else {
        db.get('news').push({page: lastPage, data: pageData}).write();
    }
};

let read = (pageNum) => {
    return db.get('news').find({page: pageNum}).get('data').value() || [];
};

let validate = (pageNum) => {
    return db.get('lastPage').value() >= pageNum;
};

let isExpire = () => {
    return Date.now() - db.get('timestamp').value() >= cacheExpire;
};

let reset = () => {
    db.set('news', []).write();
    db.set('lastPage', 1).write();
    db.set('timestamp', Date.now()).write();
};
