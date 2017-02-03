const express = require('express');
const bodyParser = require('body-parser');
const assigner = require('./lib');
const PORT = process.env.PORT || 3000;
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => console.log('Server listening on', PORT));

app.get('/', (req, res) => res.send('hi'));

app.post('/', (req, res) => {
    console.log('Got a post');
    res.send(assigner(req.body.names, req.body.size, req.body.iterations));
});
