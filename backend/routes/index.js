const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Job Schema
const Job = require('../models/job_schema');

//User Schema
const User = require('../models/user_schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const fs = require('fs');
const path = require('path');

// password reset
const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

//* Job Hiring
router.post('/hire/:jobId', async function (req, res) {
    const jobId = req.params.jobId;
    const userId = req.body.userId;

    try {
        const job = await Job.findById(jobId);
        const user = await User.findById(userId);

        if (!job || !user) {
            return res.status(404).json({ message: 'Job or User not found' });
        }

        // Update the job's isHired field
        job.isHired = true;
        await job.save();

        // Add the job to the user's hiredJobs array
        user.hiredJobs.push(job._id);
        await user.save();


        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // email service
            auth: {
                user: 'resetpass905@gmail.com', // email service id
                pass: 'afkrgeiwdsuhecdl', // email service Password(App Password)
            },
            host: 'smtp.gmail.com',
            secure: false
        });

        const mailOptions = {
            to: job.email,
            from: 'resetpass905@gmail.com',
            subject: 'Hiring! Request',
            html: ` 
            <p>Congratulations! Dear, <Strong>${job.fullname}</Strong></p>,

    <p>You have received a request form <strong>${user.name}</strong> to hire you for the position of <strong>${job.jobRole}</strong>.</p>
    
    <p>You can reply to this Mail for further assistance.</p>
    
    <p>If you do not want to work for <strong>${user.name}</strong>, kindly ignore this email or contact support if you have any questions.</p>

    <p>Thank you, </p>
    <p>Best regards,</p>
    <p>The AskService Team</p>
    
    <p>For support, contact us at supportService@gmail.com</p>`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email for hiring Process: ', err);
                return res.status(500).send({ message: 'Error sending email for hiring Process' });
            }
            return res.status(200).send({ message: 'Email for Hiring Process sent to the Person' });
        });

    } catch (err) {
        console.error('Error processing Hiring Process request: ', err);
        return res.status(500).send({ message: 'Error processing Hiring Process request' });
    }
})


//* --- User ---

//* SIGNUP
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

//* LOGIN
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

//* UPDATE User Profile
router.post('/profile/:id', fileUpload.single('image'), async function (req, res) {
    // Finding the user 
    const user = await User.findById(req.params.id);
    // Debugging
    console.log('Updated User Body: ', req.body);
    console.log('Updated User File: ', req.file);

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const { name, email } = req.body;

    // Checking if not a single value is sent
    if (!name && !email && !req.file) {
        return res.status(400).json({ message: 'Please fill at least one field' });
    }

    // Update user information
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }

    // If it exists | because there could be the case when user was updating it for the first time.
    if (req.file && user.image) {
        // deleting previous image
        const imagePath = path.join(__dirname, '../uploads/images', user.image);
        fs.unlink(imagePath, err => {
            if (err) {
                console.log('Error in deleting previous Profile Pic: ', err);
            } else {
                console.log('Previous Profile Pic deleted successfully');
            }
        });
    }

    if (req.file) {
        user.image = req.file.filename;
    }

    // Debugging
    console.log('Updated User: ', user);

    try {
        const savedUser = await user.save();
        return res.status(200).json({ message: 'User Updated Succesfully', user: savedUser });
    } catch (error) {
        return res.status(400).json({ message: 'Failed to Update the user', error });
    }

});

//* NodeMaielr || Password Update Email
router.post('/forgot-password', async (req, res) => {
    // Extracting email from the body
    const { email } = req.body;
    // Debugging
    console.log('Body of Update Password: ', req.body);

    try {
        const user = await User.findOne({ email: email });

        // checking if user exists or not
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Generate a random token for reset
        const token = crypto.randomBytes(32).toString('hex');

        // Set token and expiration on the user
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // email service
            auth: {
                user: 'resetpass905@gmail.com', // email service id
                pass: 'afkrgeiwdsuhecdl', // email service Password(App Password)
            },
            host: 'smtp.gmail.com',
            secure: false
        });

        const mailOptions = {
            to: user.email,
            from: 'resetpass905@gmail.com',
            subject: 'Password Reset',
            text: ` Hello ${user.name},

            We received a request to reset the password for your account.
            
            To reset your password, please click the link below or copy and paste it into your browser:
            http://localhost:3000/reset-password/${token}
            
            If you did not request a password reset, please ignore this email or contact support if you have any questions.
            
            Thank you,
            The AskService Team
            
            For support, contact us at supportService@gmail.com`
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.error('Error sending email: ', err);
                return res.status(500).send({ message: 'Error sending email' });
            }
            return res.status(200).send({ message: 'Password reset email sent' });
        });

    } catch (err) {
        console.error('Error processing request: ', err);
        return res.status(500).send({ message: 'Error processing request' });
    }
});

//* UPDATE || Forgot the password
router.post('/reset-password/:token', async (req, res) => {
    // Extracting token and password from URL and the body
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Finding the user with the help of token if the time has not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        // if time expired or user not found
        if (!user) {
            return res.status(400).send({ message: 'Password reset token is invalid or has expired' });
        }

        // Update the user's password
        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return res.status(200).send({ message: 'Password has been reset' });
    } catch (err) {
        console.error('Error resetting password: ', err);
        return res.status(500).send({ message: 'Error resetting password' });
    }
});

//* UPDATE The Job Card
router.post('/jobs/:jobId', fileUpload.single('avatar'), async (req, res) => {
    console.log("Req body of Job card form", req.body);

    // Extracting id from the url
    const jobId = req.params.jobId;
    // extracting values which user has filled in the form
    const { fullname, mobilenumber, address, city, state, postalcode, about } = req.body;


    // Checking if empty form
    if (!fullname && !mobilenumber && !address && !city && !state && !req.file && !postalcode && !about) {
        return res.status(400).json({ message: 'Please fill atleast one of the fields' })
    }
    // if mobile number and postal code are filled then they must of lenght 10 and 6 respectively
    if (mobilenumber && !/^\d{10}$/.test(mobilenumber)) {
        return res.status(400).json({ message: 'Mobile number must contain exactly 10 digits' });
    }
    if (postalcode && !/^\d{6}$/.test(postalcode)) {
        return res.status(400).json({ message: 'Postal code must contain exactly 6 digits' });
    }


    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send({ message: 'Job not found' });
        }

        // Debugging
        console.log('Prevous Job: ', job);

        if (fullname) {
            job.fullname = fullname;
        }
        if (mobilenumber) {
            job.mobilenumber = mobilenumber;
        }
        if (address) {
            job.address = address;
        }
        if (city) {
            job.city = city;
        }
        if (state) {
            job.state = state;
        }
        if (postalcode) {
            job.postalcode = postalcode;
        }
        if (about) {
            job.about = about;
        }

        // Deleting prevous job card avatar
        if (req.file) {
            // path of the image
            const imagePath = path.join(__dirname, '../uploads/images', job.avatar);
            // deleting previous image
            fs.unlink(imagePath, err => {
                if (err) {
                    console.log('Error in deleting previous Job Card avatar: ', err);
                } else {
                    console.log('Previous avatar deleted successfully');
                }
            });
            // Assigning||Adding a new one
            job.avatar = req.file.filename;
        }

        // Debugging
        console.log('Updated Job: ', job);

        // Saving the updated job
        const savedJob = await job.save();
        return res.status(200).json({ message: 'Job Card Updated Succesfully', job: savedJob });
    } catch (err) {
        console.error('Error in updating the job card: ', err);
        return res.status(500).send({ message: 'Error in updating the job card' });
    }
});

//* CREATE Job Application
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

//* DELETE The Job Card
router.delete('/jobs/:jobId', async function (req, res) {
    // Extracting id
    const jobId = req.params.jobId;
    // Debugging
    console.log('JObId of the job card: ', jobId);

    try {
        // Checking if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Failed to find job application' });
        }

        // Deleting image
        const imagePath = path.join(__dirname, '../uploads/images', job.avatar);
        fs.unlink(imagePath, err => {
            if (err) {
                console.log('Error in deleting previous Job Card avatar: ', err);
            } else {
                console.log('Previous avatar deleted successfully');
            }
        });

        // Deleting Job Card...
        await Job.findByIdAndDelete(jobId);
        return res.status(200).json({ message: 'Job Application deleted successfully' });
    } catch (error) {
        console.log('Failed to delete job application | Backend');
        res.status(500).json({ message: 'Failed to delete job application', error });
    }
});

module.exports = router; //exporting the routes