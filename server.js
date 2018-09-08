/**
 * For Heroku deployment or server side rendering.
 */
const express = require('express');
const app = express();
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

// redirect http traffic to https
const { redirectToHTTPS } = require('express-http-to-https');

// don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

// make express serve pre-gzipped files
app.use('/', expressStaticGzip(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html.gz'));
})

const port = process.env.PORT || 8080;
const newsApiKey = process.env.NEWS_API_KEY

app.listen(port);

console.log(`listening to port ${port}`)
console.log(`newsapi key ${newsApiKey}`)
