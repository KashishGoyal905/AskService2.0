const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Job Schema
const Job = require('../models/job_schema');

//User Schema
const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

// Import user routes
// const userRoutes = require('./users');
// router.use('/user', userRoutes);

// multer file upload
const fileUpload = require('../middleware/file-upload');

// route for the specific jobs
router.get('/hire/:role', async function (req, res) {
    const role = req.params.role;    // taking the value of role from params
    // console.log(role);
    const jobs = await Job.find({ jobRole: role }); // finding all the jobs with specific job role. [asynchronous function]
    return res.status(200).json({
        jobs: jobs, // passing all the specific jobs found in the hire page
    });
});


// user
// signup
router.post('/register', async function (req, res) {
    console.log('req: ', req.body);
    const { name, email, password } = req.body;

    let user;
    try {
        user = await User.findOne({ email: req.body.email });
        // hashing the password
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 12);

        if (!user) {
            user = new User({
                name,
                email,
                password: hashedPassword,
            });
            console.log(user);
            const savedUser = await user.save();

            // let token;
            // token = jwt.sign(
            //     { userId: savedUser._id, email: savedUser.email }, 'tokenSecret', { expiresIn: '1h' }
            // );

            // console.log('Token1: ', token);

            res.status(201).json({ message: 'User created successfully', user: savedUser, token: token });
        } else {
            res.status(500).json({ message: 'User already exists' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// login
router.post('/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    let user;

    try {
        user = await User.findOne({ email: email });

        if (!user) {
            res.status(500).json({ message: 'Invalid credentails' });
        }

        let isValidPas = false;
        isValidPas = bcrypt.compare(password, user.password);

        if (!isValidPas) {
            res.status(500).json({ message: 'Invalid credentails' });
        }

        let token;
        token = jwt.sign(
            { userId: user._id, email: user.email }, 'tokenSecret', { expiresIn: '1h' }
        );

        res.status(201).json({ message: 'User logged in successfully', user: user, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error signin in user', error });
    }
});

// update profile
router.post('/profile/:id', fileUpload.single('image'), async function (req, res) {
    const user = await User.findById(req.params.id);
    console.log(req.body);
    console.log(req.file);
    const { name, email } = req.body;
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Update user information
    user.name = name;
    user.email = email;

    if (req.file) {
        user.image = req.file.filename; // Save the path to the uploaded image
    }

    console.log(user);

    try {
        const savedUser = await user.save();
        res.status(201).json({ user: savedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save job application', error });
    }

});

// its position matters
// it will act as authentication
// all the routes below this could only be accessed if authenticated  
// router.use(checkAuth);
// CreateJOB
router.post('/applyjob', checkAuth, fileUpload.single('avatar'), async function (req, res) {
    const { fullname, mobilenumber, email, jobRole, address, city, state, postalcode, about } = req.body;
    // console.log('File:', req.file);
    const jobApplication = new Job({
        fullname,
        mobilenumber,
        email,
        jobRole,
        address,
        city,
        state,
        postalcode,
        about,
        avatar: req.file ? req.file.filename : null, // Save the filename
    });

    console.log(jobApplication);

    try {
        const savedJob = await jobApplication.save();
        res.status(201).json({ job: savedJob });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save job application', error });
    }
});

module.exports = router; //exporting the routes