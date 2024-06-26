require('dotenv').config(); // Load environment variables from .env file

const express = require("express"); //requiring
const app = express(); // initializing the instance of express application
const path = require("path");
const db = require('./config/mongoose');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true })); // helps to parse the data

// CORS
app.use(express.json()); // parse the data coming from the frontend fecth
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    next();
});


// Static route for serving uploaded images (multer)
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));

// app.use('/user', require('./routes/users'));
app.use('/', require('./routes'));  // routes


//listening to the server
app.listen(PORT, function (req, res, err) {
    if (err) {
        console.log(err);
        return (err);
    } else {
        console.log(`Server started at ${PORT}`);
    }
});
