const mongoose = require('mongoose'); // importing mongoose library.

// establishing a connection to the mongoDB database.
mongoose.connect(`mongodb+srv://kashishgoyal961:iNMfqzS2bH5ptIKs@askservice.vnaa8ns.mongodb.net/test`);
// mongoose.connect(`mongodb://0.0.0.0:27017/test`);

const db = mongoose.connection; // storing a reference of the database connection


db.on('error', console.error.bind(console, 'error in connecting to the database')); // event listener for error

db.once('open', function (err) { // event listener for the open event on the database connection.
    console.log("connected to the database");
});

module.exports = db;    // exporting the database