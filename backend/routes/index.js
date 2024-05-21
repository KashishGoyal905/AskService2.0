const express = require('express'); // requiring express module
const router = express.Router(); // creating an instance of express router [to handle specific paths in your application]

// Job Schema
const Job = require('../models/job_schema');

// route for the home page
router.get('/hire/:role', async function (req, res) {
    const role = req.params.role;    // taking the value of role from params
    console.log(role);
    const jobs = await Job.find({jobRole: role}); // finding all the jobs. [asynchronous function]
    return res.status(200).json({
        jobs: jobs, // passing all the jobs found in the hire page
    });
});

router.post('/applyjob', async function (req, res) {
    try {
        const job = await Job.create(req.body);
        console.log(job);
        return res.status(200).json({ message: 'User created successfully', job: job });
    } catch (e) {
        console.log("error in creating a job", e);
        return;
    }
});

module.exports = router; //exporting the routes