const mongoose = require('mongoose'); // importing mongoose library
const Schema = mongoose.Schema; // creating a reference to the schema class


// defined a job schema
const jobSchema = new Schema({
    fullname: { type: String, },
    mobilenumber: { type: Number, unique: false },
    email: { type: String, unique: false },
    jobRole: { type: String, default: 'cleaner' },
    address: { type: String, },
    city: { type: String, },
    state: { type: String, },
    postalcode: { type: Number },
    about: { type: String, },
    avatar: {
        type: String,
    },
    isHired: { type: Boolean, required: true, default: false },

}, { timestamps: true }); // to add createdAt and updatedAt


const Job = mongoose.model('Job', jobSchema); // creating a mongoose model
module.exports = Job; //exporting the model