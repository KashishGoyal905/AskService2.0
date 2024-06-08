const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// defined a user schema
const userSchema = new Schema({
    name: { type: String, },
    email: { type: String, unique: true, },
    password: { type: String },
    image: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
}, { timestamps: true }); // to add createdAt and updatedAt


const User = mongoose.model('User', userSchema); // creating a mongoose model
module.exports = User; //exporting the model