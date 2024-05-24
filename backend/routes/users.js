const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

//User Schema
const User = require('../models/user_schema');

// user
router.post('/register', async function (req, res) {
    // console.log('req: ', req.body);

    const { name, email, password } = req.body;

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        user = new User({
            name,
            email,
            password
        });
        console.log(user);
    } else {
        res.status(500).json({ message: 'User already exists' });
    }

    try {
        const savedUser = await user.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

module.exports = router; //exporting the routes