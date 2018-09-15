/**
 * For Heroku deployment or server side rendering.
 */
const express = require('express');
const compression = require('compression');
const app = express();
const path = require('path');

// redirect http traffic to https
const { redirectToHTTPS } = require('express-http-to-https');

const newsApi = require('./newsApi');

app.use('/api', newsApi);

// compress files
app.use(compression());

// don't redirect if the hostname is `localhost:port` or the route is `/insecure`
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301));

app.use(express.static(`${__dirname}/dist`));

app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
})

const port = process.env.PORT || 8080;

app.listen(port);

console.log(`listening to port ${port}`)
