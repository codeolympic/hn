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
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`).then(
            (res) => {
                return res.data;
            },
            (err) => {
                reject(err)
            }
        )
    }));
};

// TODO: save resp to https://github.com/typicode/lowdb
