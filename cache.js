const port = process.env.PORT || 3000;
const chunkSize = process.env.CHUNK || 50;
const express = require('express');

let server = express();

server.listen(port, () => {
    console.log(`listening on port ${port}`);
});

server.get('/cache/news', (req, res) => {
    fetchIds().then((newsIds) => {
        // TODO: chunk the ids
        fetchNews(newsIds).then((news) => {
            res.status(200).send(news);
        }, (err) => {
            console.log(err);
        })
    }, (err) => {
        console.log(err);
    })
});

const axios = require('axios');

let fetchIds = () => {
    return axios.get('https://hacker-news.firebaseio.com/v0/newstories.json').then(
        (resp) => {
            return resp.data;
        },
        (err) => {
            reject(err)
        }
    )
};

let fetchNews = (newsIds) => {
    return Promise.all(newsIds.map((newsId) => {

        let cache = read(newsId);

        if (cache) {
            console.log(`cache hit: ${newsId}`);
            return cache;
        }

        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`).then(
            (res) => {
                console.log(`update cache: ${newsId}`);
                write(res.data);
                return res.data;
            },
            (err) => {
                reject(err)
            }
        )
    }));
};

const lowdb = require('lowdb');
// TODO: FileAsync
const FileSync = require('lowdb/adapters/FileSync');
const dbfile = new FileSync('cache.db');
const db = lowdb(dbfile);

db.defaults({ news: [] }).write();

let write = (news) => {
    return db.get('news').push(news).write();
};

let read = (newsId) => {
    return db.get('news').find({ id: newsId }).value();
};
