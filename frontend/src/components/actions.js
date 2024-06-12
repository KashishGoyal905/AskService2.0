// actions.js
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function applyJobAction({ request }) {
    // const formData = await request.formData();
    // const jobApplication = {
    //     fullname: formData.get('fullname'),
    //     mobilenumber: formData.get('mobilenumber'),
    //     email: formData.get('email'),
    //     jobRole: formData.get('jobRole'),
    //     address: formData.get('address'),
    //     city: formData.get('city'),
    //     state: formData.get('state'),
    //     postalcode: formData.get('postalcode'),
    //     about: formData.get('about'),
    //     // Add other form fields as needed
    // };
    // console.log('Job Application:', jobApplication);

    // // Example of sending data to the backend
    // const response = await fetch('https://askservice2-0.onrender.com/applyjob', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(jobApplication),
    // });

    //* if i want to show error below respective fields i have to use state, therefore i have to move this code inside a function on that component page only with the help of formdata.

    // Extracting data of the form with the help of formData
    const formData = await request.formData();
    console.log('FormData entries:', [...formData.entries()]);
    // extracting token || to only proceed with if the req if the user is authenticated
    const token = localStorage.getItem('token');

    try {
        // Sending a req to tha backend with form data.
        const response = await fetch('https://askservice2-0.onrender.com/applyjob', {
            method: 'POST',
            body: formData, // FormData automatically sets the correct headers
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        const resData = await response.json();
        const role = resData.job.jobRole;

        if (!response.ok) {
            console.log('Failed to submit job application')
            throw new Error(resData.message || 'Failed to submit job application');
        }

        // looging the data for development mode
        console.log('Job: ', resData.job);
        // Toast Message
        toast.success(resData.message);
        // Redirect or handle success
        return redirect(`/hire/${role}`);
    } catch (err) {
        toast.error(err.message);
        console.error('Error in creating a job:', err.message, err);
    }
}


// SignUp Action
export async function signUpAction({ request }) {
    // Extracting data from the Form using formData
    const formData = await request.formData();

    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    };
    // Debugging
    console.log('SignUp User: ', user);

    try {
        // Sending a POST request to the backend with signup form data
        const response = await fetch('https://askservice2-0.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        // Getting data back from the backend
        const resData = await response.json();

        // If any error recieved from the backend || it will tirgger the catch block present below
        if (!response.ok) {
            console.log('Failed to SignUp', resData.message);
            throw new Error(resData.message || 'Failed to SignUp');
        }

        // toast message
        toast.success(resData.message || 'Signed Up Successfully');
        // Redirect
        return redirect(`/login`);
    } catch (err) { // it holds the error sent by the above Error method
        console.log('Failed to SignUp', err.message);
        toast.error(err.message || 'Failed to SignUp');
        return redirect(`/signup`);
    }

    //* It works, to make it work you have to add a middleware (fileupload.none() )in the route on the backend
    // const formData = await request.formData();

    // console.log('FormData entries:', [...formData.entries()]);

    // // Note: No need to manually create an object; you can use FormData directly
    // const response = await fetch('https://askservice2-0.onrender.com/register', {
    //     method: 'POST',
    //     body: formData, // FormData automatically sets the correct headers
    // });
    // rest code same as above
}

//* This is abondend, it's logic lies in the Logic component itself 
export async function loginAction({ request }) {
    // Extracting data from the Form using formData
    const formData = await request.formData();

    const user = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    console.log('Login User: ', user);

    try {
        // Sending a POST request to the backend with Login form data
        const response = await fetch('https://askservice2-0.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const resData = await response.json();

        // If any error recieved from the backend || next, it will tirgger the catch block
        if (!response.ok) {
            console.log(resData.message || 'Failed to Login');
            throw new Error(resData.message || 'Failed to Login');
        }

        // Setting the token recieved from the backend to the localStorage
        localStorage.setItem('token', resData.token);

        // Redirect
        return redirect(`/ `);
    } catch (err) {
        console.log('Failed to Login', err.message);
        toast.error(err.message || 'Failed to Login');
        return redirect(`/login`);
    }
}