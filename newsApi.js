const https = require('https');
const express = require('express');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY

router.get('/na', (req, res) => {
    if (!NEWS_API_KEY) {
        res.status(401).send('Unauthorized');
        return;
    }

    const page = req.query.page;
    if (!page || parseInt(page) <= 0) {
        res.status(400).send('Positive page number is required');
        return;
    }

    const pageSize = req.query.pageSize;
    if (!pageSize || parseInt(pageSize) <= 0) {
        res.status(400).send('Positive page size is required');
        return;
    }

    const country = req.query.country;
    if (!country.trim()) {
        res.status(400).send('Country is required');
        return;
    }

    fetchHeadLines(country.trim(), page, pageSize).then((json) => {
        let maxAge = 600;
        if (json.articles && json.articles.length > 0) {
            maxAge = 3600;
        }

        res.set('Cache-Control', `public, immutable, max-age=${maxAge}`);
        res.send(json);
    });
});

const fetchHeadLines = (country, page, pageSize) => {
    return fetchRemote(country, page, pageSize);
    // return fetchMock();
}

const fetchRemote = (country, page, pageSize) => {
    return new Promise((resolve, reject) => {
        https.get(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}&apiKey=${NEWS_API_KEY}`, (res) => {
            const data = [];

            res.on('data', (chunk) => {
                data.push(chunk);
            });

            res.on('end', () => {
                const headLines = Buffer.concat(data);
                resolve(JSON.parse(headLines));
            })
        }).on('error', (err) => reject(err));
    })
}

const fetchMock = () => {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile('./mock.json', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })
    }); 
}

module.exports = router;
