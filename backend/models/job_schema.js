const mongoose = require('mongoose'); // importing mongoose library
const Schema = mongoose.Schema; // creating a reference to the schema class


// defined a job schema
const jobSchema = new Schema({
    fullname: { type: String, required: true, },
    mobilenumber: { type: Number, required: true, },
    email: { type: String, required: true, },
    jobRole: { type: String, required: true, },
    address: { type: String, },
    city: { type: String, required: true, },
    state: { type: String, },
    postalcode: { type: Number },
    about: { type: String, },
    avatar: { type: String, required: true, required: true, },
    isHired: { type: Boolean, default: false },
}, { timestamps: true }); // to add createdAt and updatedAt

    
const Job = mongoose.model('Job', jobSchema); // creating a mongoose model
module.exports = Job; //exporting the model