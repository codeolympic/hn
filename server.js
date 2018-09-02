/**
 * For Heroku deployment
 */
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname)));
app.use('/', express.static(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
})

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`listening to port ${port}`)
