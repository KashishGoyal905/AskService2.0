const express = require("express"); //requiring
const app = express(); // initializing the instance of express application
const path = require("path");
const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: true })); // helps to parse the data


// Static route for serving uploaded images (multer)
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// CORS
app.use(express.json()); // parse the data coming from the frontend fecth
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});

// app.use('/user', require('./routes/users'));
app.use('/', require('./routes'));  // routes


//listening to the server
app.listen(8080, function (req, res, err) {
    if (err) {
        console.log(err);
        return(err);
    } else {
        console.log("server is running on port no:8080");
    }
});
