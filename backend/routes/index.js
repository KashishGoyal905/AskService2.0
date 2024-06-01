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


//* --- User ---
// signup
router.post('/register', async function (req, res) {
    // Debugging
    console.log('SignUp Req: ', req.body);
    // Extracting data from the req sent to the backend via frontend
    const { name, email, password } = req.body;

    // Checking if all the fields exists or not
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // extra vallidation for the password
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    let user;
    try {
        // Checking if user already exists or not
        user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // hashing the password
        let hashedPassword;
        hashedPassword = await bcrypt.hash(password, 12);

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

        res.status(200).json({ message: 'User created successfully', user: savedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// login
router.post('/login', async (req, res) => {
    // Debugging
    console.log('Login Req: ', req.body);
    // Extracting data from the req sent to the backend via frontend
    const { email, password } = req.body;

    // Checking if all the fields exists or not
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let user;
    try {
        user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentails' });
        }

        let isValidPas = false;
        isValidPas = await bcrypt.compare(password, user.password);

        if (!isValidPas) {
            return res.status(400).json({ message: 'Invalid Credentails' });
        }

        let token;
        token = jwt.sign(
            { userId: user._id, email: user.email }, 'tokenSecret', { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'User logged in successfully', user: user, token: token });
    } catch (error) {
        console.log('Error in loggin in the user', error);
        return res.status(500).json({ message: 'Error signin in user', error });
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


// CreateJOB
router.post('/applyjob', checkAuth, fileUpload.single('avatar'), async function (req, res) {
    // extracting values which user has filled in the form
    const { fullname, mobilenumber, email, jobRole, address, city, state, postalcode, about } = req.body;
    // console.log('File:', req.file);

    // checking if the mandatory fields are filled or not
    if (!fullname || !mobilenumber || !email || !jobRole || !city || !about || !req.file) {
        return res.status(400).json({ message: 'Please fill all the required fields' })
    }

    // Additional validation for mobile number and postal code
    if (!/^\d{10}$/.test(mobilenumber)) {
        return res.status(400).json({ message: 'Mobile number must contain exactly 10 digits' });
    }

    if (postalcode && !/^\d{6}$/.test(postalcode)) {
        return res.status(400).json({ message: 'Postal code must contain exactly 6 digits' });
    }

    // Creating a job
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
        res.status(201).json({ message: 'Job Created Successfully', job: savedJob });
    } catch (error) {
        console.log('Failed to create job application | Backend');
        res.status(500).json({ message: 'Failed to save job application', error });
    }
});

module.exports = router; //exporting the routes