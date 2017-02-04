const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const assigner = require('./lib');
const PORT = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => console.log('Server listening on', PORT));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/', (req, res) => {
    console.log('Got a post');
    res.send(assigner(req.body.names, req.body.size, req.body.iterations));
});
