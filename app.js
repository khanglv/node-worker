const express = require('express');
const dt = require('./src/components/common');
const app = express();
const bodyParser = require('body-parser');
const dbo = require('./database/connection');

const action = require('./api/action');
const poster = require('./api/poster');
const rdDataSystem = require('./api/rdDataSystem');
const systemChange = require('./systemChange/systemChange');

app.use(bodyParser.urlencoded({ extended: true }));

dbo.connectToServer( function( err, client ) {
    if (err) console.log(err);
    console.log("connect succes");
});


const hostname = '127.0.0.1';
const port = 3000;
const url = require('url');

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.all('/secret', function (req, res) {
    console.log('Accessing the secret section ...')
    res.send('Hello World 2!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.use('/create/table', action);
app.use('/poster', poster);
app.use('/random/dataSystem', rdDataSystem);
app.use('/system/change', systemChange);