const express = require("express"); //requiring
const app = express(); // initializing the instance of express application

const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: true })); // helps to parse the data

app.use(express.json()); // parse the data coming from the frontend fecth
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

app.use('/', require('./routes'));  // routes

//listening to the server
app.listen(8080, function (req, res, err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log("server is running on port no:8080");
    }
});
