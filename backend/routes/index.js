const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Job Schema
const Job = require('../models/job_schema');

// multer file upload
const fileUpload = require('../middleware/file-upload');

// route for the home page
router.get('/hire/:role', async function (req, res) {
    const role = req.params.role;    // taking the value of role from params
    // console.log(role);
    const jobs = await Job.find({ jobRole: role }); // finding all the jobs with specific job role. [asynchronous function]
    return res.status(200).json({
        jobs: jobs, // passing all the specific jobs found in the hire page
    });
});

router.post('/applyjob', fileUpload.single('avatar'), async function (req, res) {
    const { fullname, mobilenumber, email, jobRole, address, city, state, postalcode, about } = req.body;
    console.log('File:', req.file);
    console.log('Body:', req.body);
    console.log('-----');
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