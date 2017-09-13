const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/business.json', (req, res) => {
    res.json({
        data: req.query
    })
})

app.get('/live-preview', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/live-preview.html'));
})

app.listen(3000, () => console.log("The server is running on port 3000!"));

